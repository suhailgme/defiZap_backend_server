// Zaps whose volume should be aggregated among all contracts may have multiple addresses

const UniSwap_AddLiquityV2_General = '0x97402249515994Cc0D22092D3375033Ad0ea438A'
const UniSwapRemoveLiquityGeneral_v1 = '0x4316e3aD83ca2Cf0ea5e3b25e3DE2fA7F93cfE9c'
const proxy = '0x52fc6455f258760705e70f70160b06619bfe0adb'

const unipoolAddresses = [
  {
    name: 'sETH Unipool',
    address: ['0xd3eba712988df0f8a7e5073719a40ce4cbf60b33','0xFb86852EC41A6220eABe1bcb1E4B606e46eb2Dd9'],
    interactionsSaved: 3,
    aggregated: true
  },
  {
    name: 'Unipool V2',
    address: ['0x80c5e6908368cb9db503ba968d7ec5a565bfb389','0x343e3a490c9251dc0eaa81da146ba6abe6c78b2d'],
    interactionsSaved: 3,
    aggregated: true
  },
  {
    name: 'sETH PoolsFyi',
    address: ['0xFb86852EC41A6220eABe1bcb1E4B606e46eb2Dd9'],
    interactionsSaved: 3,
    aggregated: false
  },
  {
    name: 'DAI Unipool',
    address: ['0x929A10EfDA7099865dAD8286Aee8715078902d51','0x3da6738C2b388eBDf2feA79554f27DaA7F2d3178'],
    interactionsSaved: 3,
    aggregated: true
  },
  {
    name: 'DAI PoolsFyi',
    address: ['0x3da6738C2b388eBDf2feA79554f27DaA7F2d3178'],
    interactionsSaved: 3,
    aggregated: false
  },
  {
    name: 'SNX Unipool',
    address: ['0xe3385df5b47687405A02Fc24322DeDb7df381852'],
    interactionsSaved: 3,
    aggregated: true
  },
  {
    name: 'MKR Unipool',
    address: ['0x13240b97c40D7E306cEDf3adc9cB057CeC74c361','0x1Fdf2cDc2B369bF4ceCFe528a4DcA3F6a74D6782'],
    interactionsSaved: 3,
    aggregated: true
  },
  {
    name: 'MKR PoolsFyi',
    address: ['0x1Fdf2cDc2B369bF4ceCFe528a4DcA3F6a74D6782'],
    interactionsSaved: 3,
    aggregated: false
  },
  {
    name: 'CHAI Unipool',
    address: ['0xd17cda470bd0237fae82ef254c84d06d0e4cc02f'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'cDAI Unipool',
    address: ['0x52fc6455F258760705e70F70160b06619BFe0ADb'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'LINK Unipool',
    address: ['0x8e8b9CF6d411b6c8Dacc63c306f2691ED195D91d'],
    interactionsSaved: 3,
    aggregated: true
  },
  {
    name: 'DAI LLP: 100% ETH',
    address: ['0x8dfcB49766c0296E4373A0300b52C3637614Db59'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'LINK LLP: 100% ETH',
    address: ['0x20eF0c900F8E7EC3a1A89a761f0670Ae9E3dD709'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'LINK LLP: 100% LINK',
    address: ['0x408609F5aCaB253d41cB5Dfce913ff367937313B'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'wBTC LLP: 100% ETH',
    address: ['0x21091c5EA13854AB0965090dc4fc20280f1a5730'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'wBTC Unipool',
    address: ['0x4EBee4Cf5ba7de81f222fEfA4e5d0C30c4968FfF'],
    interactionsSaved: 5,
    aggregated: true
  },
  {
    name: 'wBTC LLP: 100% wBTC',
    address: ['0xE4B7B00a802834BeA733F06A0A24a869F2765df7'],
    interactionsSaved: 5,
    aggregated: true
  }
]

const classicAddresses = [
  {
    name: 'Lender',
    address: ['0xe7e5ff8f7745c13bef49d6fddbc6c208e99d5244','0xEbD5E23927891FBfDa10487cCC9A1a1a7b9a4210'],
    interactionsSaved: 4,
    aggregated: true
  },
  // {
  //   name: 'New Lender',
  //   address: ['0xEbD5E23927891FBfDa10487cCC9A1a1a7b9a4210'],
  //   interactionsSaved: 4
  // },
  {
    name: 'ETH Bull',
    address: ['0xc36fe594dB560bFDE1BDf5d6b40a7a775d702a1C','0x04b35eF193e2357328aE79914569721a7fFd6146'],
    interactionsSaved: 2,
    aggregated: true
  },
  // {
  //   name: 'New ETH Bull',
  //   address: ['0x04b35eF193e2357328aE79914569721a7fFd6146'],
  //   interactionsSaved: 2
  // },
  {
    name: 'Moderate Bull',
    address: ['0x9DC5Ee55De10f9345e9f58EA1539320B9644B2f4','0x3b122c376E472AE6ae7a4739bEBF7b68E045b285'],
    interactionsSaved: 3,
    aggregated: true
  },
  // {
  //   name: 'New Moderate Bull',
  //   address: ['0x3b122c376E472AE6ae7a4739bEBF7b68E045b285'],
  //   interactionsSaved: 3
  // },
  {
    name: 'Double Bull',
    address: ['0x2e213129b76d4B12aBf590bf18874362cE0976Dc','0x1eE8C303f5AB9b36Bc30b9345dEC7e9a748fa693'],
    interactionsSaved: 2,
    aggregated: true
  },
  // {
  //   name: 'New Double Bull',
  //   address: ['0x1eE8C303f5AB9b36Bc30b9345dEC7e9a748fa693'],
  //   interactionsSaved: 2
  // },
  {
    name: 'Super Saver',
    address: ['0xd31C3DEC5aE4051dC1B70F2cdEc965e80880F386', '0xEcb53d65816444Dbbf6A326b8dF959caEda3FaF9'],
    interactionsSaved: 4,
    aggregated: true
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

const getUniSwapRemoveGeneral = () => UniSwapRemoveLiquityGeneral_v1

const getProxy = () => proxy

const getAllAddresses = () => {
  let addresses = unipoolAddresses.concat(classicAddresses)
  addresses.push({ name: 'General Unipool', address: [getUniswapGeneral()], interactionsSaved: null, aggregated:true })
  addresses.push({ name: 'proxy', address: [getProxy()], interactionsSaved: null, aggregated: false })
  addresses.push({ name: 'UniSwapRemoveLiquityGeneral_v1', address: [getUniSwapRemoveGeneral()], interactionsSaved: null, aggregated: false })
  return addresses
}

module.exports = {
  getUnipoolAddresses,
  getClassicAddresses,
  getUniswapGeneral,
  getProxy,
  getAllAddresses,
  getUniSwapRemoveGeneral
}
