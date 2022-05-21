// SPDX-License-Identifier: MIT
///@author Adam Korchane
pragma solidity 0.8.13;

///@notice this contract represent a conversation between 2 users
contract Conversation {
    event NewMessage(address indexed _sender, address indexed _recipient);
    
    address sender;
    address recipient;

    struct Message{
        string message;
        address from;
        address to;
        uint sendAt;
    }

    Message[] messages;

    /**
    *@notice the sender will always be the one who initiate the conversation
    */
    constructor(address _sender, address _recipient){
        sender = _sender;
        recipient = _recipient;
    }

    /**
    *@custom:param _message is the message user want to send 
    *@notice push struct Message to storage array, and emit an event NewMessage
    */
    function sendMessage(string memory _message)external{
        require(msg.sender == sender || msg.sender == recipient, "You can't participate to this conversation");
        require(keccak256(abi.encodePacked(_message)) != keccak256(abi.encodePacked("")), "Message is empty");
        //case sender is the actual sender
        if(msg.sender == sender){
            Message memory mess = Message(_message, msg.sender, recipient, block.timestamp);
            messages.push(mess);
            emit NewMessage(msg.sender, recipient);
        }
        //case sender is the recipient
        else{
            Message memory mess = Message(_message, msg.sender, sender, block.timestamp);
            messages.push(mess);
            emit NewMessage(msg.sender, sender);
        }
    }

    /**
    *@return messages
    */
    function getAllMessages()external view returns(Message[] memory){
        return messages;
    }

    /**
    *@return last message
    */
    function getLastMessage()external view returns(Message memory){
        return messages[messages.length - 1];
    }
}