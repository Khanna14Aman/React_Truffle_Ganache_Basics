// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract SimpleStorage {
    int a;


    function setter(int _a) public {
        a = _a;
    }

    function getter() public view returns (int) {
        return a;
    }
}