const hre = require("hardhat");

async function main() {
  const AelinERC1155Test = await hre.ethers.getContractFactory("AelinERC1155Test");
  const aelinERC1155Test = await AelinERC1155Test.deploy();

  await aelinERC1155Test.deployed();

  console.log("Aelin ERC-1155 Test deployed on:", aelinERC1155Test.address);

  await _verifyContract(aelinERC1155Test.address)
}

async function _verifyContract(contractAddress) {
  if (['hardhat', 'local'].includes(hre.network.name)) return;

  if (!process.env.ETHERSCAN_API) {
    throw new Error('Missing ETHERSCAN_API configuration');
  }

  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      apiKey: `${process.env.ETHERSCAN_API}`,
    });

    console.log('Verified!');
  } catch (err) {
    console.log('Verification Error:');
    console.error(err);
  }
} 

main().catch((error) => {
  console.error(error);
  process.exit(1)
});
