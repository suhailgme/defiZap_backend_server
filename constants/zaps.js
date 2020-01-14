const zaps = [
    {
        name: 'sETH Unipool',
        address: 'sETHUnipool.DeFiZap.eth',
        image: '/images/unipool_sETH_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap'],
        accessTo: ['Pooling Rewards', 'Staking Rewards'],
        description: [
            '50% converted to sETH',
            '50% leftover input + acquired tokens are added to the sETH/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ],
    },
    {
        name: 'DAI Unipool',
        address: 'DAIUnipool.DeFiZap.eth',
        // image: '/images/unipool_dai_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap'],
        accessTo: ['Pooling Rewards'],
        description: [
            '50% converted to DAI',
            '50% leftover input + acquired tokens are added to the DAI/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'SNX Unipool',
        address: 'SNXUnipool.DeFiZap.eth',
        image: '/images/unipool_snx_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap'],
        accessTo: ['Pooling Rewards'],
        description: [
            '50% converted to SNX',
            '50% leftover input + acquired tokens are added to the SNX/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'MKR Unipool',
        address: 'MKRUnipool.DeFiZap.eth',
        image: '/images/unipool_mkr_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap'],
        accessTo: ['Pooling Rewards'],
        description: [
            '50% converted to MKR',
            '50% leftover input + acquired tokens are added to the MKR/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },

    {
        name: 'CHAI Unipool',
        address: 'CHAIUnipool.DeFiZap.eth',
        image: '/images/unipool_chai_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap', 'Kyber', 'Maker'],
        accessTo: ['Pooling Rewards', 'DSR Rewards'],
        description: [
            '50% of your ETH input is first converted to DAI on Kyber to avoid ETH->CHAI slippage',
            'Converted DAI is then wrapped into CHAI. Learn more on chai.money',
            'CHAI + other 50% ETH input are added to the ETH/CHAI Liquidity Pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'cDAI Unipool',
        address: 'cDAIPool.DeFiZap.eth',
        image: '/images/unipool_cdai_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap', 'Kyber', 'Compound'],
        accessTo: ['Pooling Rewards', 'Lending Rewards'],
        description: [
            '50% of your ETH input is first converted to DAI on Kyber to avoid ETH<>cDAI slippage',
            'Converted DAI is then supplied on Compound to mint cDAI',
            'cDAI + other 50% ETH input are added to the ETH/cDAI Liquidity Pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'LINK Unipool',
        address: 'LINKUnipool.DeFiZap.eth',
        image: '/images/unipool_link_illustration.svg',
        gasLimitRequirement: '1500000',
        platformsUsed: ['Uniswap'],
        accessTo: ['Pooling Rewards'],
        description: [
            '50% converted to LINK',
            '50% leftover input + acquired tokens are added to the LINK/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'DAI LLP',
        address: 'DaiLLP.DeFiZap.eth',
        image: '/images/llp_dai_illustration.svg',
        gasLimitRequirement: '5000000',
        platformsUsed: ['Uniswap', 'Kyber', 'Fulcrum'],
        accessTo: ['Pooling Rewards', 'Long ETH with 2X Leverage'],
        description: [
            '34% used to open ETH Long position with 2X leverage on Fulcrum (dLETH2x)',
            '33% converted to DAI',
            '33% leftover input + acquired tokens are added to the DAI/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'LINK LLP',
        address: 'linkllp.defizap.eth',
        image: '/images/llp_link_illustration.svg',
        gasLimitRequirement: '5000000',
        platformsUsed: ['Uniswap', 'Kyber', 'Fulcrum'],
        accessTo: ['Pooling Rewards', 'Long ETH with 2X Leverage'],
        description: [
            '34% used to open ETH Long position with 2X leverage on Fulcrum (dLETH2x)',
            '33% converted to LINK',
            '33% leftover input + acquired tokens are added to the LINK/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: '2x LINK LLP',
        address: '2xLINKLLP.defizap.eth',
        image: '/images/llp_2x_link_illustration.svg',
        gasLimitRequirement: '5000000',
        platformsUsed: ['Uniswap', 'Kyber', 'Fulcrum'],
        accessTo: ['Pooling Rewards', 'Long LINK with 2X Leverage'],
        description: [
            '34% used to open ETH Long position with 2X leverage on Fulcrum (dLETH2x)',
            '33% converted to LINK',
            '33% leftover input + acquired tokens are added to the LINK/ETH Liquidity pool on Uniswap. Receive minted liquidity tracking tokens back to your wallet.'
        ]
    },
    {
        name: 'Lender',
        address: 'Lender.DeFiZap.eth',
        gasLimitRequirement: '7000000',
        platformsUsed: ['Kyber', 'Fulcrum', 'Compound'],
        accessTo: ['Lending Rewards', 'Long ETH with 2X Leveragee'],
        description: [
            '90% auto-converted into DAI + supplied to Compound to mint cDAI',
            '10% used to open ETH Long position with 2X leverage on Fulcrum (dLETH2x)'
        ]
    },
    {
        name: 'ETH Bull',
        address: 'EthBull.DeFiZap.eth',
        gasLimitRequirement: '7000000',
        platformsUsed: ['Fulcrum'],
        accessTo: ['Lending  Short BTC', 'Long ETH with 2X Leveragee'],
        description: [
            '50% used to open ETH Long position with 2X leverage on Fulcrum (dLETH2x)',
            '50% used to open BTC Short position on Fulcrum (dsWBTC2x)'
        ]
    },
    {
        name: 'Moderate Bull',
        address: 'ModerateBull.DeFiZap.eth',
        gasLimitRequirement: '2000000',
        platformsUsed: ['Synthetix'],
        accessTo: ['Synthetic Assets'],
        description: [
            '50% used to acquire sBTC on Synthetix exchange.',
            '50% used to acquire sETH on Synthetix exchange.'
        ]
    },
    {
        name: 'Double Bull',
        address: 'DoubleBull.DeFiZap.eth',
        gasLimitRequirement: '7000000',
        platformsUsed: ['Fulcrum'],
        accessTo: ['Long BTC with 2X Leverage', 'Long ETH with 2X Leverage'],
        description: [
            '50% used to open ETH Long position with 2X leverage on Fulcrum (dLETH2x)',
            '50% used to open BTC Long position with 2X leverage on Fulcrum (dLWBTC2x)'
        ]

    },
]
const getZaps = () => {
    return zaps
}

module.exports = getZaps






