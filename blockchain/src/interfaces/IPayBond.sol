// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IPayment} from "@flarenetwork/flare-periphery-contracts/coston2/IPayment.sol";
import {IReferencedPaymentNonexistence} from "@flarenetwork/flare-periphery-contracts/coston2/IReferencedPaymentNonexistence.sol";

interface IPayBond {
    enum Status {
        Open,
        Reclaimed,
        Claimed
    }

    struct Bond {
        address payer;
        address payee;
        bytes32 payeeHash;
        uint256 amount;
        uint256 deadline;
        bytes32 reference;
        Status status;
    }

    event BondCreated(
        uint256 indexed bondId,
        address indexed payer,
        address indexed payee,
        bytes32 reference,
        uint256 amount,
        uint256 deadline
    );
    event BondReclaimed(uint256 indexed bondId);
    event BondClaimed(uint256 indexed bondId, address indexed payee);

    function createBond(address payee, bytes32 payeeHash, uint256 amount, uint256 deadline)
        external
        returns (uint256 bondId, bytes32 reference);

    function reclaim(uint256 bondId, IPayment.Proof calldata proof) external;

    function claim(uint256 bondId, IReferencedPaymentNonexistence.Proof calldata proof) external;

    function getBond(uint256 bondId) external view returns (Bond memory);
}
