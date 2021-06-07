import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { DRCVaultInstance } from "../../types/truffle-contracts";
import { Withdraw } from "../../types/truffle-contracts/DRCVault";

const DRCVault = artifacts.require("DRCVault");

export const testWithdraw = async (accounts: Truffle.Accounts) => {
  let instance: DRCVaultInstance;
  let drcToken: any;

  before(async () => {
    instance = await DRCVault.deployed();
    drcToken = new web3.eth.Contract(
      ERC20.abi as AbiItem[],
      "0x6D38D09eb9705A5Fb1b8922eA80ea89d438159C7"
    );
  });

  it("Should withdraw tokens, reduce balance and total", async () => {
    const balanceBefore = await drcToken.methods.balanceOf(accounts[0]).call();

    const withdrawReceipt = await instance.withdraw(5000);

    const withdrawLog = withdrawReceipt.logs.find(
      (log) => log.event === "Withdraw"
    ) as Truffle.TransactionLog<Withdraw>;

    assert.equal(
      withdrawLog.args.user.toLowerCase(),
      accounts[0].toLowerCase()
    );
    assert.equal(withdrawLog.args.amount.toNumber(), 5000);

    const balanceAfter = await drcToken.methods.balanceOf(accounts[0]).call();

    assert.equal(Number(balanceBefore) + 5000, Number(balanceAfter));

    const balanceOf = await instance.balanceOf(accounts[0]);
    assert.equal(balanceOf.toNumber(), 5000);

    const total = await instance.totalAmountLocked();
    assert.equal(total.toNumber(), 15000);
  });

  it("Should withdraw, remove holder and reduce total", async () => {
    const balanceBefore = await drcToken.methods.balanceOf(accounts[1]).call();

    const withdrawReceipt = await instance.withdraw(10000, {
      from: accounts[1],
    });

    const withdrawLog = withdrawReceipt.logs.find(
      (log) => log.event === "Withdraw"
    ) as Truffle.TransactionLog<Withdraw>;

    assert.equal(
      withdrawLog.args.user.toLowerCase(),
      accounts[1].toLowerCase()
    );
    assert.equal(withdrawLog.args.amount.toNumber(), 10000);

    const balanceOf = await instance.balanceOf(accounts[1]);
    assert.equal(balanceOf.toNumber(), 0);

    const total = await instance.totalAmountLocked();
    assert.equal(total.toNumber(), 5000);

    const holders = await instance.holders();
    assert.equal(holders.includes(accounts[0]), true);
    assert.equal(holders.includes(accounts[1]), false);
    assert.equal(holders.length, 1);
  });
};
