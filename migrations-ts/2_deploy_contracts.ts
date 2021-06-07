const DRCVault = artifacts.require("DRCVault");

type Network = "development" | "ropsten" | "main";

module.exports = async (
  deployer: Truffle.Deployer,
  network: Network
  // accounts: string[]
) => {
  console.log(network);

  const drcAddress =
    network === "main"
      ? "0xa150Db9b1Fa65b44799d4dD949D922c0a33Ee606"
      : "0x6D38D09eb9705A5Fb1b8922eA80ea89d438159C7";

  await deployer.deploy(DRCVault, drcAddress);

  const drcVault = await DRCVault.deployed();
  console.log(
    `DRCVault deployed at ${drcVault.address} in network: ${network}.`
  );
};

export {};
