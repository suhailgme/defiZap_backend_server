// Zaps whose volume should be aggregated among all contracts may have multiple addresses

const UniSwap_AddLiquityV2_General = '0x606563f8DC27F316b77F22d14D9Cd025B4F70469'
const proxy = '0x52fc6455f258760705e70f70160b06619bfe0adb'

const unipoolAddresses = [
  {
    name: 'sETH Unipool',
    address: ['0xd3eba712988df0f8a7e5073719a40ce4cbf60b33'],
    interactionsSaved: 3
  },
  {
    name: 'DAI Unipool',
    address: ['0x929A10EfDA7099865dAD8286Aee8715078902d51','0x3da6738C2b388eBDf2feA79554f27DaA7F2d3178'],
    interactionsSaved: 3
  },
  {
    name: 'DAI PoolsFyi',
    address: ['0x3da6738C2b388eBDf2feA79554f27DaA7F2d3178'],
    interactionsSaved: 3
  },
  {
    name: 'SNX Unipool',
    address: ['0xe3385df5b47687405A02Fc24322DeDb7df381852'],
    interactionsSaved: 3
  },

  {
    name: 'MKR Unipool',
    address: ['0x13240b97c40D7E306cEDf3adc9cB057CeC74c361','0x1Fdf2cDc2B369bF4ceCFe528a4DcA3F6a74D6782'],
    interactionsSaved: 3
  },
  {
    name: 'MKR PoolsFyi',
    address: ['0x1Fdf2cDc2B369bF4ceCFe528a4DcA3F6a74D6782'],
    interactionsSaved: 3
  },
  {
    name: 'CHAI Unipool',
    address: ['0xd17cda470bd0237fae82ef254c84d06d0e4cc02f'],
    interactionsSaved: 5
  },
  {
    name: 'cDAI Unipool',
    address: ['0x52fc6455F258760705e70F70160b06619BFe0ADb'],
    interactionsSaved: 5
  },
  {
    name: 'DAI Leveraged Liquidity Pool',
    address: ['0x8dfcB49766c0296E4373A0300b52C3637614Db59'],
    interactionsSaved: 5
  }
]

const classicAddresses = [
  {
    name: 'Lender',
    address: ['0xe7e5ff8f7745c13bef49d6fddbc6c208e99d5244','0xEbD5E23927891FBfDa10487cCC9A1a1a7b9a4210'],
    interactionsSaved: 4
  },
  // {
  //   name: 'New Lender',
  //   address: ['0xEbD5E23927891FBfDa10487cCC9A1a1a7b9a4210'],
  //   interactionsSaved: 4
  // },
  {
    name: 'ETH Bull',
    address: ['0xc36fe594dB560bFDE1BDf5d6b40a7a775d702a1C','0x04b35eF193e2357328aE79914569721a7fFd6146'],
    interactionsSaved: 2
  },
  // {
  //   name: 'New ETH Bull',
  //   address: ['0x04b35eF193e2357328aE79914569721a7fFd6146'],
  //   interactionsSaved: 2
  // },
  {
    name: 'Moderate Bull',
    address: ['0x9DC5Ee55De10f9345e9f58EA1539320B9644B2f4','0x3b122c376E472AE6ae7a4739bEBF7b68E045b285'],
    interactionsSaved: 3
  },
  // {
  //   name: 'New Moderate Bull',
  //   address: ['0x3b122c376E472AE6ae7a4739bEBF7b68E045b285'],
  //   interactionsSaved: 3
  // },
  {
    name: 'Double Bull',
    address: ['0x2e213129b76d4B12aBf590bf18874362cE0976Dc','0x1eE8C303f5AB9b36Bc30b9345dEC7e9a748fa693'],
    interactionsSaved: 2
  },
  // {
  //   name: 'New Double Bull',
  //   address: ['0x1eE8C303f5AB9b36Bc30b9345dEC7e9a748fa693'],
  //   interactionsSaved: 2
  // },
  {
    name: 'Super Saver',
    address: ['0xd31C3DEC5aE4051dC1B70F2cdEc965e80880F386', '0xEcb53d65816444Dbbf6A326b8dF959caEda3FaF9'],
    interactionsSaved: 4
  },
  // {
  //   name: 'New Super Saver',
  //   address: ['0xEcb53d65816444Dbbf6A326b8dF959caEda3FaF9'],
  //   interactionsSaved: 4
  // },
]

const getUnipoolAddresses = () => unipoolAddresses

const getClassicAddresses = () => classicAddresses

const getUniswapGeneral = () => UniSwap_AddLiquityV2_General

const getProxy = () => proxy

const getAllAddresses = () => {
  let addresses = unipoolAddresses.concat(classicAddresses)
  addresses.push({ name: 'UniSwap_AddLiquityV2_General', address: [getUniswapGeneral()], interactionsSaved: null })
  addresses.push({ name: 'proxy', address: [getProxy()], interactionsSaved: null })
  return addresses
}

module.exports = {
  getUnipoolAddresses,
  getClassicAddresses,
  getUniswapGeneral,
  getProxy,
  getAllAddresses
}






