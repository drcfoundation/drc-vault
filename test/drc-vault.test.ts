import { testDeposit } from "./test-cases/test-deposit";

contract("DigitalReserve", (accounts) => {
  describe("Deposit", async () => testDeposit(accounts));
});
