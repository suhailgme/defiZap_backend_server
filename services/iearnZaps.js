const ethers = require('ethers')
const Cron = require('cron').CronJob
const Bottleneck = require('bottleneck')
const fetch = require('node-fetch')
const addressService = require('./addressService')

const numberWithCommas = (number) => {
    if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return null
  }

const limiter = new Bottleneck({
  minTime: 555
})

const iearnZaps = [
  { name: 'yCurveZapSwap', address: '0x2C3A2558E9B91e893E53bCe94DE3457a29f6B262' },
  { name: 'yCurveZap', address: '0x975f1bc238303593efab00d63cf0fc5f519a8de0' },
  { name: 'yCurveZapOut', address: '0xed03415e5705c5AbBf8E94c491b715Df526cAD55' }
]

const yCurveZap = { DAI: 0, TUSD: 0, USDC: 0, USDT: 0, Total:0 }

const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${iearnZaps[1].address}&page=3&offset=1000&sort=asc&apikey=VG81MKD27J447IXSHPHEYGZX3KKQVJA9MT`

;(async () => {
  let hasNextPage = true
  let transactions
  index = 1
  while (hasNextPage) {
    console.log(index)
    let txRes = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${
        iearnZaps[1].address
      }&page=${index++}&offset=1000&sort=asc&apikey=VG81MKD27J447IXSHPHEYGZX3KKQVJA9MT`
    )
    txRes = (await txRes.json()).result
    hasNextPage = txRes.length
    txRes.forEach(tx => {
      if (
        tx.from !== '0x0000000000000000000000000000000000000000' &&
        tx.from !== iearnZaps[1].address
      ) {
        if (tx.tokenSymbol === 'DAI' || tx.tokenSymbol === 'TUSD') {
          yCurveZap[tx.tokenSymbol] += +ethers.utils.formatUnits(tx.value, 18)
          yCurveZap.Total += +ethers.utils.formatUnits(tx.value, 18)
        } else {
          yCurveZap[tx.tokenSymbol] += +ethers.utils.formatUnits(tx.value, 6)
          yCurveZap.Total += +ethers.utils.formatUnits(tx.value, 6)
        }
      }
    })
  }
  yCurveZap.DAI = numberWithCommas(yCurveZap.DAI.toFixed(2))
  yCurveZap.TUSD = numberWithCommas(yCurveZap.TUSD.toFixed(2))
  yCurveZap.USDC = numberWithCommas(yCurveZap.USDC.toFixed(2))
  yCurveZap.USDT = numberWithCommas(yCurveZap.USDT.toFixed(2))
  yCurveZap.Total = numberWithCommas(yCurveZap.Total.toFixed(2))


  console.log('yCurveZap Aggregate Zap Ins (StableCoin)', yCurveZap)
})()
