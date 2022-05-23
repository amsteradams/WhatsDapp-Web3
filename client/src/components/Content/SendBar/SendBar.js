import React, {useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../../App';
import { ContentContext } from '../../Main/Main';
import convContract from "../../../contracts/Conversation.json";
import "./SendBar.css";
export default function SendBar() {
  const contentContext = useContext(ContentContext);
  const context = useContext(ContractContext);
  const [bool, setBool] = useState(false);
  const [input, setInput] = useState();
  const [instance, setInstance] = useState();

  useEffect(() => {
    getInstance();
  }, [contentContext])
  
  const handleChange = (e) => {
    if(e.length == 0){
        setInput(e);
        setBool(false);
    }
    else if(e.length > 0){
        setInput(e);
        setBool(true);
    }
} 
  const getInstance = async () => {
    const instance = await new context.data.web3.eth.Contract(convContract.abi, contentContext.data.contract);
    setInstance(instance);
    //event : 
    await instance.events.NewMessage()
            .on('data', event => {
              if(event.returnValues._sender == context.data.owner || event.returnValues._recipient == context.data.owner){
                setInput('');
              }
              })
            .on('changed', changed => console.log(changed))
            // .on('error', err => throw err)
            .on('connected', str => console.log(str))
  }
  const send = async() => {
    if(input != undefined){
    await instance.methods.sendMessage(input).send({from:context.data.owner});
    }else{alert('Message is empty')}
  }
  return (
    <div id='sendBar'>
        <input onChange={e => {handleChange(e.target.value)}} value={input} type='text' id='send-input' placeholder='Write your message'/>
        {bool == true ?<input type='image' onClick={send} id='send-img' src="./send-valid.png"/> : <img  id='send-img' src="./send.png"/>}
    </div>
  )
}
