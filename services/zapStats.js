const ethers = require('ethers');
const Cron = require('cron').CronJob
const Bottleneck = require('bottleneck')
const addressService = require('./addressService')

const limiter = new Bottleneck({
    minTime: 555,
    maxConcurrent: 1
})

const gwei = 1000000000;
const etherScan = new ethers.providers.EtherscanProvider()

let zaps = []

const job = new Cron('*/15 * * * *', async () => {
    zaps = await getZapTransactions()
})

job.start()

const getZapStats = async () => {
    if (zaps.length === 0)
        zaps = await getZapTransactions()
    console.log('Returning Zaps')
    return zaps
}

const getZapTransactions = async () => {
    const ethPrice = await etherScan.getEtherPrice()
    const zapAddresses = addressService.getAllAddresses()
    let zaps = zapAddresses.map(async (zap) => {
        let volume = totalGas = gasPrice = 0
        let numTransactions = 0
        await Promise.all(zap.address.map(async (address, index) => { 
            let history = await limiter.schedule(() => etherScan.getHistory(address)) 
            console.log(new Date().toLocaleString(), 'updating', zap.name, zap.address.length > 1 ? index + 1 : '')
            history.forEach(transaction => {
                volume += +ethers.utils.formatEther(transaction.value)
                gasPrice += +transaction.gasPrice.toString() / gwei
                numTransactions++
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
            updated: new Date().toGMTString(),
            ethPrice
        }
    })
    return Promise.all(zaps)
};

(async () => {
    zaps = await getZapTransactions()
})()

module.exports = getZapStats

