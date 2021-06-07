import { testDeposit } from "./test-cases/test-deposit";
import { testWithdraw } from "./test-cases/test-withdraw";

contract("DigitalReserve", (accounts) => {
  describe("Deposit", async () => testDeposit(accounts));
  describe("Withdraw", async () => testWithdraw(accounts));
});
