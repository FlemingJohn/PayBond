// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {IPayment} from "@flarenetwork/flare-periphery-contracts/coston2/IPayment.sol";
import {IReferencedPaymentNonexistence} from "@flarenetwork/flare-periphery-contracts/coston2/IReferencedPaymentNonexistence.sol";
import {IPayBond} from "./interfaces/IPayBond.sol";
import {Reference} from "./libraries/Reference.sol";

contract PayBond is IPayBond {
    IERC20 public immutable token;

    uint256 private nextBondId;
    mapping(uint256 => Bond) private bonds;

    error InvalidAmount();
    error InvalidDeadline();
    error InvalidPayee();
    error NotPayer();
    error NotOpen();
    error DeadlineNotPassed();
    error WrongReference();
    error WrongDestination();
    error AmountTooLow();
    error PaidLate();
    error WindowTooShort();
    error InvalidProof();

    constructor(IERC20 fxrp) {
        token = fxrp;
    }

    function createBond(address payee, bytes32 payeeHash, uint256 amount, uint256 deadline)
        external
        returns (uint256 bondId, bytes32 reference)
    {
        if (amount == 0) revert InvalidAmount();
        if (deadline <= block.timestamp) revert InvalidDeadline();
        if (payee == address(0)) revert InvalidPayee();

        bondId = nextBondId++;
        reference = Reference.create(bondId);

        bonds[bondId] = Bond({
            payer: msg.sender,
            payee: payee,
            payeeHash: payeeHash,
            amount: amount,
            deadline: deadline,
            reference: reference,
            status: Status.Open
        });

        token.transferFrom(msg.sender, address(this), amount);

        emit BondCreated(bondId, msg.sender, payee, reference, amount, deadline);
    }

    function reclaim(uint256 bondId, IPayment.Proof calldata proof) external {
        Bond storage bond = bonds[bondId];
        if (bond.status != Status.Open) revert NotOpen();
        if (msg.sender != bond.payer) revert NotPayer();

        IPayment.ResponseBody calldata body = proof.data.responseBody;
        if (body.standardPaymentReference != bond.reference) revert WrongReference();
        if (body.receivingAddressHash != bond.payeeHash) revert WrongDestination();
        if (body.receivedAmount < int256(bond.amount)) revert AmountTooLow();
        if (uint256(body.blockTimestamp) > bond.deadline) revert PaidLate();
        if (!ContractRegistry.getFdcVerification().verifyPayment(proof)) revert InvalidProof();

        bond.status = Status.Reclaimed;
        token.transfer(bond.payer, bond.amount);

        emit BondReclaimed(bondId);
    }

    function claim(uint256 bondId, IReferencedPaymentNonexistence.Proof calldata proof) external {
        Bond storage bond = bonds[bondId];
        if (bond.status != Status.Open) revert NotOpen();
        if (block.timestamp <= bond.deadline) revert DeadlineNotPassed();

        IReferencedPaymentNonexistence.RequestBody calldata body = proof.data.requestBody;
        if (body.standardPaymentReference != bond.reference) revert WrongReference();
        if (body.destinationAddressHash != bond.payeeHash) revert WrongDestination();
        if (body.amount < bond.amount) revert AmountTooLow();
        if (uint256(body.deadlineTimestamp) < bond.deadline) revert WindowTooShort();
        if (!ContractRegistry.getFdcVerification().verifyReferencedPaymentNonexistence(proof)) revert InvalidProof();

        bond.status = Status.Claimed;
        token.transfer(bond.payee, bond.amount);

        emit BondClaimed(bondId, bond.payee);
    }

    function getBond(uint256 bondId) external view returns (Bond memory) {
        return bonds[bondId];
    }
}
