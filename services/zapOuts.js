const ethers = require('ethers')
const Cron = require('cron').CronJob
const Bottleneck = require('bottleneck')
const fetch = require('node-fetch')
const addressService = require('./addressService')
const tokens = require('../constants/tokens')
const numberWithCommas = number => {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return null
}

let zapOuts = {}
const job = new Cron('*/15 * * * *', async () => {
  zapsOuts = await queryZapOuts()
  // for (token in zapOuts.aggregateZapOuts.tokenVolumes)
  //   zapOuts.aggregateZapOuts.tokenVolumes[token] = +zapOuts.aggregateZapOuts.tokenVolumes[
  //     token
  //   ].toFixed(4)
})

job.start()

const UnipoolRemoveLiquidity = addressService.getUniSwapRemoveGeneral()

// Keccack 256 hashes of the strings 'onlyETH', 'onlyDAI', 'only ERC'
const onlyETH = '0xe5301db7f16f049b9e60a341dd155611d5ff45dca64a4b7ef7b9056962737020'
const onlyDAI = '0x915430c162580f0438d1f517f34b34a90c9bba4f9a23f8dc6346cffd517af391'
const onlyERC = '0xb741967cb300e80679c1e75089c64911877e74c285ae3de2881e364944401524'

const queryZapOuts = async () => {
  console.log(new Date().toLocaleString(), 'Updating Zap Outs')
  let aggregateZapOuts = {
    totalEstAcrruedFees: 0,
    numZapOuts: 0,
    totalEthVolume: 0,
    totalLpTokenVolume: 0
  }
  let tokenVolumes = {}
  let provider = ethers.getDefaultProvider('mainnet')

  const abiRes = await fetch(
    `https://api.etherscan.io/api?module=contract&action=getabi&address=${UnipoolRemoveLiquidity}&apikey=VG81MKD27J447IXSHPHEYGZX3KKQVJA9MT`
  )
  const abi = (await abiRes.json()).result
  const interface = new ethers.utils.Interface(abi)
  const logs = await provider.getLogs({ address: UnipoolRemoveLiquidity, fromBlock: 0 })

  let zapOuts = logs.map(log => {
    const txHash = log.transactionHash
    const event = interface.parseLog(log)
    const { symbol, name, decimals } = tokens.find(
      token => token.address === event.values.TokenAdddress
    )

    const liquidityTokensRedeemed = ethers.utils.formatEther(event.values.LiqRed)
    const ethReceived = ethers.utils.formatEther(event.values.ethRec)
    const tokensReceived = ethers.utils.formatUnits(event.values.tokenRec, decimals)
    const tokenEthPrice = (tokensReceived / ethReceived).toString()
    const ethVolume = (tokensReceived / tokenEthPrice + +ethReceived).toString()
    const estEthFees = (ethVolume * 0.01).toString()

    if (tokenVolumes.hasOwnProperty(symbol)) tokenVolumes[symbol] += +tokensReceived
    else tokenVolumes[symbol] = +tokensReceived
    aggregateZapOuts.totalEstAcrruedFees += +estEthFees
    aggregateZapOuts.numZapOuts++
    aggregateZapOuts.totalEthVolume += +ethVolume
    aggregateZapOuts.totalLpTokenVolume += +liquidityTokensRedeemed

    return {
      exchangeAddress: event.values.ExchangeAddress,
      tokenAdddress: event.values.TokenAdddress,
      userAddress: event.values._user,
      txHash,
      receivedMode:
        event.values.func.hash === onlyETH
          ? 'ETH'
          : event.values.func.hash === onlyDAI
          ? 'DAI'
          : 'ERC',
      liquidityTokensRedeemed,
      ethReceived,
      tokensReceived,
      tokenEthPrice,
      ethVolume,
      estEthFees,
      name,
      symbol,
      decimals
    }
  })
  aggregateZapOuts.tokenVolumes = tokenVolumes
  aggregateZapOuts.updated = new Date().toGMTString()
  return {
    aggregateZapOuts: aggregateZapOuts,
    zapOuts: zapOuts
  }

  console.table({
    'Total Zap Outs': +aggregateZapOuts.numZapOuts.toFixed(2),
    'Total Zap Out Volume (ETH)': +aggregateZapOuts.totalEthVolume.toFixed(2),
    'Total Est. Accrued Fees (ETH)': +aggregateZapOuts.totalEstAcrruedFees.toFixed(2),
    'Total LP Token Volume (UNI-V1)': +aggregateZapOuts.totalLpTokenVolume.toFixed(2),
    'Total Token Volume (Native):': '-------',
    ...tokenVolumes
  })
}

;(async () => {
  zapOuts = await queryZapOuts()
  // for (token in zapOuts.aggregateZapOuts.tokenVolumes)
  //   zapOuts.aggregateZapOuts.tokenVolumes[token] = +zapOuts.aggregateZapOuts.tokenVolumes[
  //     token
  //   ].toFixed(4)
})()

module.exports = getZapOuts = () => zapOuts
