const ethers = require('ethers');

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ]
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API}`,
  },
  networks: {
    local: {
      url: 'http://localhost:8545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      },
    },
    ['optimistic-mainnet']: {
      url: process.env.NETWORK_ENDPOINT || 'https://mainnet.optimism.io',
      accounts: process.env.DEPLOYER_KEY ? [`${process.env.DEPLOYER_KEY}`] : [],
      gasPrice: ethers.utils.parseUnits('0.001', 'gwei').toNumber(),
    },
  },
};
