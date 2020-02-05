const ethers = require('ethers');
const Cron = require('cron').CronJob
const Bottleneck = require('bottleneck')
const fetch = require('node-fetch')
const addressService = require('./addressService')

const limiter = new Bottleneck({
    minTime: 555,
})

const gwei = 1000000000;
const etherScan = new ethers.providers.EtherscanProvider()

let zaps = []
let aggregateZapStats = {}

const job = new Cron('*/15 * * * *', async () => {
    zaps = await getZapTransactions()
    aggregateZapStats = await computeAggregateZapStats(zaps)
})


job.start()

const getZapStats = async () => {
    if (zaps.length === 0)
        zaps = await getZapTransactions()
    console.log('Returning Zaps')
    return zaps
}

const getAggregateZapStats = async () => {
    if (zaps.length === 0)
        zaps = await getZapTransactions()
    console.log('Returning Aggregate Zap Stats')
    return aggregateZapStats
}

const computeAggregateZapStats = async (zaps) => {
    const ethPrice = await etherScan.getEtherPrice()
    numTransactions = totalVolumeETH = totalVolumeUSD = avgVolumeETH = avgVolumeUSD = totalTimeSaved = transactionsEliminated = 0
    console.log(new Date().toLocaleString(), 'Aggregating Zap Stats')
    zaps.forEach(zap => {
        if (zap.aggregated) {
            numTransactions += zap.numTransactions
            totalVolumeETH += zap.volumeETH
            totalVolumeUSD += zap.volumeUSD
            totalTimeSaved += ((((zap.numTransactions * zap.interactionsSaved) * 75) * 1.40) / 60) / 60
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

const getZapTransactions = async () => {
    const ethPrice = await etherScan.getEtherPrice()
    const zapAddresses = addressService.getAllAddresses()
    let zaps = zapAddresses.map(async (zap) => {
        let volume = totalGas = gasPrice = 0
        let numTransactions = 0
        await Promise.all(zap.address.map(async (address, index) => {
            let history = await limiter.schedule(() => fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=null`))
            history = await history.json()
            history = history.result
            // let history = await limiter.schedule(() => etherScan.getHistory(address))
            console.log(new Date().toLocaleString(), 'Updating', zap.name, zap.address.length > 1 ? index + 1 : '')
            history.forEach(transaction => {
                if (!(+transaction.isError)) {
                    // console.log(transaction)
                    volume += +ethers.utils.formatEther(transaction.value)
                    gasPrice += +transaction.gasPrice.toString() / gwei
                    numTransactions++
                } 
            })
        }))
        numTransactions -= zap.address.length * 2 //Stats do not count transactions that deploy and transfer ownership (2 per address)
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
};


(async () => {
    zaps = await getZapTransactions()
    aggregateZapStats = computeAggregateZapStats(zaps)
})()

module.exports = { getZapStats, getAggregateZapStats }

