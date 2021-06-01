// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity =0.8.4;
pragma abicoder v2;

/**
 * @dev Interface of Digital Reserve contract.
 */
interface IDRCVault {
    /**
     * @dev Emit each time a deposit action happened.
     * @param user Address made the deposit.
     * @param amount DRC amount deposited.
     */
    event Deposit(address indexed user, uint256 amount);

    /**
     * @dev Emit each time a withdraw action happened.
     * @param user Address made the withdrawal.
     * @param amount DRC amount withdrawn.
     */
    event Withdraw(address indexed user, uint256 amount);
}
