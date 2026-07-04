// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

library Reference {
    function create(uint256 bondId) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(block.chainid, address(this), bondId));
    }
}
