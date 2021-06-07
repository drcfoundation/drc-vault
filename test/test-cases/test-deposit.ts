import { DRCVaultInstance } from "../../types/truffle-contracts";
import { Deposit } from "../../types/truffle-contracts/DRCVault";

const DRCVault = artifacts.require("DRCVault");

export const testDeposit = async (accounts: Truffle.Accounts) => {
  let instance: DRCVaultInstance;

  before(async () => {
    instance = await DRCVault.deployed();
  });

  it("Should deposit and increase balance and total", async () => {
    const depositReceipt = await instance.deposit(accounts[0], 10000);

    const depositLog = depositReceipt.logs.find(
      (log) => log.event === "Deposit"
    ) as Truffle.TransactionLog<Deposit>;

    assert.equal(depositLog.args.user.toLowerCase(), accounts[0].toLowerCase());
    assert.equal(depositLog.args.amount.toNumber(), 10000);

    const balanceOf = await instance.balanceOf(accounts[0]);
    assert.equal(balanceOf.toNumber(), 10000);

    const total = await instance.totalAmountLocked();
    assert.equal(total.toNumber(), 10000);
  });
};
