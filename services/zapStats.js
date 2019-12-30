const ethers = require('ethers');
const Cron = require('cron').CronJob
const Bottleneck = require('bottleneck')

const limiter = new Bottleneck({
    minTime: 555,
    maxConcurrent: 1
})

const gwei = 1000000000;
const etherScan = new ethers.providers.EtherscanProvider()

let zaps = []

//ORDER IS IMPORTANT! OLD CONTRACT NAME/ADDRESS MUST PRECEED NEW CONTRACT NAME/ADDRESS
const addresses = {
    'sETH Unipool': '0xd3eba712988df0f8a7e5073719a40ce4cbf60b33',
    'DAI Unipool': '0x929A10EfDA7099865dAD8286Aee8715078902d51',
    'SNX Unipool': '0xe3385df5b47687405A02Fc24322DeDb7df381852',
    'MKR Unipool': '0x13240b97c40D7E306cEDf3adc9cB057CeC74c361',
    'CHAI Unipool': '0xd17cda470bd0237fae82ef254c84d06d0e4cc02f',
    'cDAI Unipool': '0x52fc6455F258760705e70F70160b06619BFe0ADb',
    'Lender': '0xe7e5ff8f7745c13bef49d6fddbc6c208e99d5244',
    'New Lender': '0xEbD5E23927891FBfDa10487cCC9A1a1a7b9a4210',
    'ETH Bull': '0xc36fe594dB560bFDE1BDf5d6b40a7a775d702a1C',
    'New ETH Bull': '0x04b35eF193e2357328aE79914569721a7fFd6146',
    'Moderate Bull': '0x9DC5Ee55De10f9345e9f58EA1539320B9644B2f4',
    'New Moderate Bull': '0x3b122c376E472AE6ae7a4739bEBF7b68E045b285',
    'Double Bull': '0x2e213129b76d4B12aBf590bf18874362cE0976Dc',
    'New Double Bull': '0x1eE8C303f5AB9b36Bc30b9345dEC7e9a748fa693',
    'Super Saver': '0xd31C3DEC5aE4051dC1B70F2cdEc965e80880F386',
    'New Super Saver': '0xEcb53d65816444Dbbf6A326b8dF959caEda3FaF9',
    'UniSwap_AddLiquityV2_General': '0x606563f8DC27F316b77F22d14D9Cd025B4F70469',
    'proxy': '0x52fc6455f258760705e70f70160b06619bfe0adb'
}

const job = new Cron('*/15 * * * *', async () => {
    zaps = await computeZapStats()
})

job.start()

const getZapStats = async () => {
    if (zaps.length === 0)
        zaps = await computeZapStats()
    console.log('Returning Zaps')
    return zaps

}

const computeZapStats = async () => {
    let zaps = []
    const ethPrice = await etherScan.getEtherPrice()
    for (const [zap, address] of Object.entries(addresses)) {
        let volume = totalGas = gasPrice = numTransactions = 0
        let history = await limiter.schedule(() => etherScan.getHistory(address))
        console.log(new Date().toLocaleString(), 'updating', zap)

        history.forEach(transaction => {
            volume += +ethers.utils.formatEther(transaction.value)
            gasPrice += +transaction.gasPrice.toString() / gwei
            numTransactions++
        })
        zaps.push({
            name: zap,
            address: addresses[zap],
            numTransactions,
            volumeETH: volume,
            avgVolumeETH: volume / numTransactions,
            volumeUSD: volume * ethPrice,
            avgVolumeUSD: (volume * ethPrice) / numTransactions,
            avgGasPrice: gasPrice / numTransactions,
            updated: new Date().toGMTString(),
            ethPrice
        })
    }
    for (let i = 0; i < zaps.length; i++) {
        if (zaps[i].name === 'Lender') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        if (zaps[i].name === 'ETH Bull') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        if (zaps[i].name === 'Moderate Bull') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        if (zaps[i].name === 'Double Bull') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
        if (zaps[i].name === 'Super Saver') {
            zaps[i].numTransactions += zaps[i + 1].numTransactions
            zaps[i].volumeETH += zaps[i + 1].volumeETH
            zaps[i].volumeUSD += zaps[i + 1].volumeUSD
            zaps[i].avgVolumeETH = zaps[i].volumeETH / zaps[i].numTransactions
            zaps[i].avgVolumeUSD = zaps[i].volumeUSD / zaps[i].numTransactions
        }
    }
    return (zaps)
};

(async () => {
    zaps = await computeZapStats()
})()

module.exports = getZapStats

