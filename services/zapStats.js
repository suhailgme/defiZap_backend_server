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

const queryZapTransactions = async () => {
    const ethPrice = await etherScan.getEtherPrice()
    const addresses = addressService.getAllAddresses()
    let zaps = addresses.map(async (address) => {
        let history = await limiter.schedule(() => etherScan.getHistory(address.address))
        let volume = totalGas = gasPrice = numTransactions = 0
        console.log(new Date().toLocaleString(), 'updating', address.name)
        history.forEach(transaction => {
            volume += +ethers.utils.formatEther(transaction.value)
            gasPrice += +transaction.gasPrice.toString() / gwei
            numTransactions++
        })
        numTransactions -= 2 //Stats do not count transactions that deploy and transfer ownership
        return {
            name: address.name,
            address: address.address,
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

const getZapTransactions = async () => {
    let zaps = await queryZapTransactions()
    for (let i = 0; i < zaps.length; i++) {
        if (zaps[i].name === 'Lender') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        else if (zaps[i].name === 'ETH Bull') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        else if (zaps[i].name === 'Moderate Bull') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        else if (zaps[i].name === 'Double Bull') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        else if (zaps[i].name === 'Super Saver') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        else if (zaps[i].name === 'DAI Unipool') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        else if (zaps[i].name === 'MKR Unipool') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
    }
    return zaps
};

(async () => {
    zaps = await getZapTransactions()
})()

module.exports = getZapStats

