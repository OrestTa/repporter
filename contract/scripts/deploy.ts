import { ethers } from "hardhat"

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const repporterContractDeployment = await ethers.deployContract("Repporter", [unlockTime], {
  });

  await repporterContractDeployment.waitForDeployment();

  console.log(
    `Deployed to ${repporterContractDeployment.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
