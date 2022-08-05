const hre = require("hardhat");

async function main() {
  const AelinNftTest = await hre.ethers.getContractFactory("AelinNftTest");
  const aelinNftTest = await AelinNftTest.deploy();

  await aelinNftTest.deployed();

  console.log("Aelin NFT Test deployed on:", aelinNftTest.address);

  await _verifyContract(aelinNftTest.address)
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
