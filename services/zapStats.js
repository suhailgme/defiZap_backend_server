const ethers = require('ethers')
const Cron = require('cron').CronJob
const Bottleneck = require('bottleneck')
const fetch = require('node-fetch')
const addressService = require('./addressService')

const limiter = new Bottleneck({
  maxConcurrent: 2,
  minTime: 555
})

const gwei = 1000000000
// const etherScan = new ethers.providers.EtherscanProvider()

let zaps = []
let aggregateZapStats = {}
let zapUsers = []

const job = new Cron('*/15 * * * *', async () => {
  zaps = await getZapTransactions()
  aggregateZapStats = await computeAggregateZapStats(zaps)
})

job.start()

const getZapStats = async () => {
  if (zaps.length === 0) zaps = await getZapTransactions()
  console.log('Returning Zaps')
  return zaps
}

const getAggregateZapStats = async () => {
  if (zaps.length === 0) zaps = await getZapTransactions()
  console.log('Returning Aggregate Zap Stats')
  return aggregateZapStats
}

const computeAggregateZapStats = async zaps => {
  // const ethPrice = await etherScan.getEtherPrice()
  const ethPrice = await getEthPrice()
  numTransactions = totalVolumeETH = totalVolumeUSD = avgVolumeETH = avgVolumeUSD = totalTimeSaved = transactionsEliminated = 0
  console.log(new Date().toLocaleString(), 'Aggregating Zap Stats')
  zaps.forEach(zap => {
    if (zap.aggregated) {
      numTransactions += zap.numTransactions
      totalVolumeETH += zap.volumeETH
      totalVolumeUSD += zap.volumeUSD
      totalTimeSaved += (zap.numTransactions * zap.interactionsSaved * 75 * 1.4) / 60 / 60
      transactionsEliminated += zap.numTransactions * zap.interactionsSaved
    }
  })
  avgVolumeETH = totalVolumeETH / numTransactions
  avgVolumeUSD = totalVolumeUSD / numTransactions

  return {
    numTransactions,
    totalVolumeETH,
    avgVolumeETH,
    totalVolumeUSD,
    avgVolumeUSD,
    totalTimeSaved,
    transactionsEliminated,
    updated: new Date().toGMTString(),
    ethPrice
  }
}

const _addUser = (transaction, zapName, zapAddress) => {
  const address = ethers.utils.getAddress(transaction.from)
  if (zapUsers.length === 0) {
    const user = {
      user: address,
      data: [
        {
          zapName,
          zapAddress,
          totalEthIn: +ethers.utils.formatEther(transaction.value),
          totalUses: 1
        }
      ],
      transactions: [
        {
          zapName,
          zapAddress,
          hash: transaction.hash,
          value: ethers.utils.formatEther(transaction.value),
          timeStamp: transaction.timeStamp
        }
      ]
    }
    // console.log('First User', user)
    zapUsers.push(user)
  } else {
    const existingUser = zapUsers.find(user => ethers.utils.getAddress(user.user) === address)
    if (existingUser) {
      const sameZap = existingUser.data.find(zap => zap.zapName === zapName)
      if (sameZap) {
        const existingTx = existingUser.transactions.find(tx => tx.hash === transaction.hash)
        if (!existingTx) {
          sameZap.totalEthIn += +ethers.utils.formatEther(transaction.value)
          sameZap.totalUses++
          existingUser.transactions.push({
            zapName,
            zapAddress,
            hash: transaction.hash,
            value: ethers.utils.formatEther(transaction.value),
            timeStamp: transaction.timeStamp
          })
        }
      } else {
        existingUser.data.push({
          zapName,
          zapAddress,
          totalEthIn: +ethers.utils.formatEther(transaction.value),
          totalUses: 1
        })
        existingUser.transactions.push({
          zapName,
          zapAddress,
          hash: transaction.hash,
          value: ethers.utils.formatEther(transaction.value),
          timeStamp: transaction.timeStamp
        })
      }

      //   console.log('User Exists', existingUser)
    } else {
      const user = {
        user: address,
        data: [
          {
            zapName,
            zapAddress,
            totalEthIn: +ethers.utils.formatEther(transaction.value),
            totalUses: 1
          }
        ],
        transactions: [
          {
            zapName,
            zapAddress,
            hash: transaction.hash,
            value: ethers.utils.formatEther(transaction.value),
            timeStamp: transaction.timeStamp
          }
        ]
      }
      //   console.log('New User', user)
      zapUsers.push(user)
    }
  }
}

const getZapUsers = () => {
  return zapUsers
}

const getZapTransactions = async () => {
  // const ethPrice = await etherScan.getEtherPrice()
  const ethPrice = await getEthPrice()
  const zapAddresses = addressService.getAllAddresses()
  let zaps = zapAddresses.map(async zap => {
    let volume = (totalGas = gasPrice = 0)
    let numTransactions = 0
    await Promise.all(
      zap.address.map(async (address, index) => {
        let history = await limiter.schedule(() =>
          fetch(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=VG81MKD27J447IXSHPHEYGZX3KKQVJA9MT`
          )
        )
        history = await history.json()
        // console.log(history)
        history = history.result
        // let history = await limiter.schedule(() => etherScan.getHistory(address))
        console.log(
          new Date().toLocaleString(),
          'Updating',
          zap.name,
          zap.address.length > 1 ? index + 1 : ''
        )
        history.forEach(transaction => {
          if (!+transaction.isError && !transaction.contractAddress) {
            _addUser(transaction, zap.name, zap.address[index])
            volume += +ethers.utils.formatEther(transaction.value)
            gasPrice += +transaction.gasPrice.toString() / gwei
            numTransactions++
          }
        })
      })
    )
    return {
      name: zap.name,
      address: zap.address,
      numTransactions,
      volumeETH: volume,
      avgVolumeETH: volume / numTransactions,
      volumeUSD: volume * ethPrice,
      avgVolumeUSD: (volume * ethPrice) / numTransactions,
      avgGasPrice: gasPrice / numTransactions,
      interactionsSaved: zap.interactionsSaved,
      aggregated: zap.aggregated,
      updated: new Date().toGMTString(),
      ethPrice
    }
  })
  return Promise.all(zaps)
}

getEthPrice = async () => {
  const res = await fetch(
    'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=VG81MKD27J447IXSHPHEYGZX3KKQVJA9MT'
  );
  const {
    result: { ethusd }
  } = await res.json();
  return +ethusd
};

;(async () => {
  zaps = await getZapTransactions()
  aggregateZapStats = computeAggregateZapStats(zaps)
})()

module.exports = { getZapStats, getAggregateZapStats, getZapUsers }
