// SPDX-License-Identifier: MIT
///@author Adam Korchane
pragma solidity 0.8.13;

import "./Manager.sol";

///@notice this contract create a Manage for a new user
contract WhatsDapp{
    event NewUser(address indexed _user, Manager _manager);

    mapping(address => Manager) manager;
    /**
    *@notice create a new Manager
    */
    function newAccount()external{
        require(address(manager[msg.sender]) == address(0), "you already have an account");
        Manager tmp = new Manager(msg.sender, address(this));
        manager[msg.sender] = tmp;
        emit NewUser(msg.sender, tmp);
    }
    ///@return the manager of _addr
    function getManagerOf(address _addr)external view returns(Manager){
        require(address(manager[_addr]) != address(0), "Sorry your friend is not on WhatsDapp");
        return manager[_addr];
    }
}