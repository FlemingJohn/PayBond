// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPayment} from "@flarenetwork/flare-periphery-contracts/coston2/IPayment.sol";
import {IReferencedPaymentNonexistence} from "@flarenetwork/flare-periphery-contracts/coston2/IReferencedPaymentNonexistence.sol";
import {PayBond} from "../src/PayBond.sol";
import {IPayBond} from "../src/interfaces/IPayBond.sol";

contract MockToken is IERC20 {
    string public name = "Mock FXRP";
    string public symbol = "FXRP";
    uint8 public decimals = 6;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}

contract PayBondTest is Test {
    PayBond private bond;
    MockToken private token;

    address private payer = address(0xA1);
    address private payee = address(0xB2);
    bytes32 private payeeHash = keccak256("payee-xrpl-address");

    function setUp() public {
        token = new MockToken();
        bond = new PayBond(token);
        token.mint(payer, 1000);
        vm.prank(payer);
        token.approve(address(bond), 1000);
    }

    function testCreateBondStoresAndLocksFunds() public {
        vm.prank(payer);
        (uint256 bondId, bytes32 reference) = bond.createBond(payee, payeeHash, 100, block.timestamp + 1 days);

        IPayBond.Bond memory stored = bond.getBond(bondId);
        assertEq(stored.payer, payer);
        assertEq(stored.payee, payee);
        assertEq(stored.amount, 100);
        assertEq(stored.reference, reference);
        assertEq(uint256(stored.status), uint256(IPayBond.Status.Open));
        assertEq(token.balanceOf(address(bond)), 100);
    }

    function testCreateBondRejectsZeroAmount() public {
        vm.prank(payer);
        vm.expectRevert(PayBond.InvalidAmount.selector);
        bond.createBond(payee, payeeHash, 0, block.timestamp + 1 days);
    }

    function testCreateBondRejectsPastDeadline() public {
        vm.prank(payer);
        vm.expectRevert(PayBond.InvalidDeadline.selector);
        bond.createBond(payee, payeeHash, 100, block.timestamp);
    }

    function testReclaimRejectsNonPayer() public {
        vm.prank(payer);
        (uint256 bondId,) = bond.createBond(payee, payeeHash, 100, block.timestamp + 1 days);

        IPayment.Proof memory proof;
        vm.prank(payee);
        vm.expectRevert(PayBond.NotPayer.selector);
        bond.reclaim(bondId, proof);
    }

    function testClaimRejectsBeforeDeadline() public {
        vm.prank(payer);
        (uint256 bondId,) = bond.createBond(payee, payeeHash, 100, block.timestamp + 1 days);

        IReferencedPaymentNonexistence.Proof memory proof;
        vm.prank(payee);
        vm.expectRevert(PayBond.DeadlineNotPassed.selector);
        bond.claim(bondId, proof);
    }
}
