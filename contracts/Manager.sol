// SPDX-License-Identifier: MIT
///@author Adam Korchane
pragma solidity 0.8.13;
import "./Conversation.sol";
import "./WhatsDapp.sol";

///@notice this contract manage all user's conversations
contract Manager{
    event NewConversation(Conversation _conversation, address _sender, address _to);

    address user;
    WhatsDapp whatsDapp;
    struct Conv{
        uint startedAt;
        Conversation conversation;
        address sender;
        address to;
    }

    Conv[] conversations;

    constructor(address _user, address _contrat){
        user = _user;
        whatsDapp = WhatsDapp(_contrat);
    }

    ///@notice create a new conversation and push the conversation to the _to manager
    function newConv(address _to)external{
        require(msg.sender == user, "you're not the owner");
        Manager tmpManager = whatsDapp.getManagerOf(_to);
        require(address(tmpManager) != address(0), "Sorry your friend is not on whatsDapp");
        Conversation _conv = new Conversation(msg.sender, _to);
        Conv memory tmp = Conv(block.timestamp, _conv, msg.sender, _to);
        tmpManager.pushConv(block.timestamp, _conv, _to, msg.sender);
        conversations.push(tmp);
        emit NewConversation(_conv, msg.sender, _to);
    }
    ///@notice push conversation in this contrat
    ///@dev used by other managers
    function pushConv(uint _startedAt,Conversation _conversation, address _sender, address _to)public{
        Conv memory _conv = Conv(_startedAt, _conversation, _sender, _to);
        conversations.push(_conv);
    }

}