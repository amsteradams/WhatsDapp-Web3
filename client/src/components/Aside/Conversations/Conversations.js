import React, {useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../../App';
import { AsideContext } from '../Aside';
import Conversation from './Conversation/Conversation';
import "./Conversations.css";
import ConvContract from '../../../contracts/Conversation.json';
export default function Conversations() {
    const context = useContext(ContractContext);
    const asideContext = useContext(AsideContext);
    const [conversations, setConversation] = useState([]);
    useEffect(() => {
      getConversations();
    }, [])
    
    const getConversations = async () => {
        const tmpArr =[]
        setConversation([]);
        //get all conversations of manager contract
        const conversations = await asideContext.asideData.manager.methods.getConvs().call({from:context.data.owner});
        //now we asign each conversation to a <Conversation />
        for (let i = 0; i < conversations.length; i++) {
            const instance = new context.data.web3.eth.Contract(ConvContract.abi, conversations[i][1]);
            const lastMessage = instance.methods.getLastMessage().call({from:context.data.owner});
            
            //check if conv has started
            if(lastMessage[0] != undefined){
                let tmp = <Conversation
                key={i}  
                startedAt={lastMessage[3]}
                contract={conversations[i][1]}
                sender={conversations[i][2]}
                to={conversations[i][3]}
                lastMessage={lastMessage[0]}
                />
                tmpArr.push(tmp);
            }
            else{
                let tmp = <Conversation
                key={i}  
                startedAt={conversations[i][0]}
                contract={conversations[i][1]}
                sender={conversations[i][2]}
                to={conversations[i][3]}
                lastMessage="Start to chat"
                /> 
                tmpArr.push(tmp);               
            }
        }
        setConversation(tmpArr);

        //event : 
        await asideContext.asideData.manager.events.NewConversation()
          .on('data', event => {
            if(event.returnValues._sender == context.data.owner){
              getConversations();
            }
            })
          .on('changed', changed => console.log(changed))
          // .on('error', err => throw err)
          .on('connected', str => console.log(str))
    }
  return (
    <div id='conv-wrapper'>
      <div id="conversations">
          {conversations}
      </div>
    </div>
  )
}
