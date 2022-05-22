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
  }

  const send = async() => {
    if(input != undefined){
    await instance.methods.sendMessage(input).send({from:context.data.owner});
    }else{alert('Message is empty')}
  }
  return (
    <div id='sendBar'>
        <input onChange={e => {handleChange(e.target.value)}} type='text' id='send-input' placeholder='Write your message'/>
        {bool == true ?<img type='submit' onClick={send} id='send-img' src="./send-valid.png"/> : <img  id='send-img' src="./send.png"/>}
    </div>
  )
}
