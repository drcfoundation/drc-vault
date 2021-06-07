import { DRCVaultInstance } from "../../types/truffle-contracts";

const DRCVault = artifacts.require("DRCVault");

export const template = async (accounts: Truffle.Accounts) => {
  let instance: DRCVaultInstance;

  before(async () => {
    instance = await DRCVault.deployed();
  });

  it("Should", async () => {});
};
