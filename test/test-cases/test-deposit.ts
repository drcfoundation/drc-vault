import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { DRCVaultInstance } from "../../types/truffle-contracts";
import { Deposit } from "../../types/truffle-contracts/DRCVault";

const DRCVault = artifacts.require("DRCVault");

export const testDeposit = async (accounts: Truffle.Accounts) => {
  let instance: DRCVaultInstance;
  let drcToken: any;

  before(async () => {
    instance = await DRCVault.deployed();
    drcToken = new web3.eth.Contract(
      ERC20.abi as AbiItem[],
      "0x6D38D09eb9705A5Fb1b8922eA80ea89d438159C7"
    );
  });

  it("Should deposit and increase balance and total", async () => {
    await drcToken.methods
      .approve(instance.address, 10000000)
      .send({ from: accounts[0] });

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

  it("Should deposit, add holder and total", async () => {
    await drcToken.methods
      .approve(instance.address, 10000000)
      .send({ from: accounts[1] });

    const depositReceipt = await instance.deposit(accounts[1], 10000, {
      from: accounts[1],
    });

    const depositLog = depositReceipt.logs.find(
      (log) => log.event === "Deposit"
    ) as Truffle.TransactionLog<Deposit>;

    assert.equal(depositLog.args.user.toLowerCase(), accounts[1].toLowerCase());
    assert.equal(depositLog.args.amount.toNumber(), 10000);

    const balanceOf = await instance.balanceOf(accounts[1]);
    assert.equal(balanceOf.toNumber(), 10000);

    const total = await instance.totalAmountLocked();
    assert.equal(total.toNumber(), 20000);

    const holders = await instance.holders();
    assert.equal(holders.includes(accounts[0]), true);
    assert.equal(holders.includes(accounts[1]), true);
    assert.equal(holders.length, 2);
  });
};
