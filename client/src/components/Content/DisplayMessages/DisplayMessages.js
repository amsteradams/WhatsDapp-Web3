import React, {useState, useEffect, useContext} from 'react'
import "./DisplayMessages.css";
import {ContractContext }from "../../../App";
import { ContentContext } from '../../Main/Main';
import ConvContract from '../../../contracts/Conversation.json';
import Message from './Message/Message';
export default function DisplayMessages() {
  const context = useContext(ContractContext)
  const contentContext = useContext(ContentContext);
  const [instance, setInstance] = useState();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getInstance();
  }, [contentContext])

  useEffect(() => {
      getMessages();  
  }, [instance])
  
  const getInstance = async() => {
    const instance = await new context.data.web3.eth.Contract(ConvContract.abi, contentContext.data.contract);
    setInstance(instance);
  }

  const getMessages = async () => {
    try {
      const tmpArr = [];
      const messages = await instance.methods.getAllMessages().call({from:context.data.owner});
      for (let i = 0; i < messages.length; i++) {
        let tmp = <Message key={i} txt={messages[i][0]} sender={messages[i][1]} time={messages[i][3]} />
        tmpArr.push(tmp);
      } 
      setMessages(tmpArr);
    } catch (error) {
      
    }
    //event : 
    if(instance){
      await instance.events.NewMessage()
            .on('data', event => {
              if(event.returnValues._sender == context.data.owner || event.returnValues._recipient == context.data.owner){
                getMessages();
              }
              })
            .on('changed', changed => console.log(changed))
            // .on('error', err => throw err)
            .on('connected', str => console.log(str))
    }
  }
  return (
    <div id='wrapper'>
      <div id='displayMessage'>
        {messages}
      </div>
    </div>
  )
}
