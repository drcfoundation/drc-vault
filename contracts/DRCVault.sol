// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity =0.8.4;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./interfaces/IDRCVault.sol";

/**
 * @dev Implementation of DRC Vault.
 */
contract DRCVault is IDRCVault, Ownable {
    using SafeMath for uint256;

    constructor(address _drcAddress) {
        drcAddress = _drcAddress;
    }

    address private immutable drcAddress;
}
