// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {PayBond} from "../src/PayBond.sol";

contract Deploy is Script {
    function run() external {
        address fxrp = vm.envAddress("FXRP_ADDRESS");
        vm.startBroadcast();
        new PayBond(IERC20(fxrp));
        vm.stopBroadcast();
    }
}
