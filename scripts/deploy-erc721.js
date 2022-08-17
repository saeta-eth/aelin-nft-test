const hre = require("hardhat");

async function main() {
  const AelinERC721Test = await hre.ethers.getContractFactory("AelinERC721Test");
  const aelinERC721Test = await AelinERC721Test.deploy();

  await aelinERC721Test.deployed();

  console.log("Aelin ERC-721 Test deployed on:", aelinERC721Test.address);

  await _verifyContract(aelinERC721Test.address)
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
