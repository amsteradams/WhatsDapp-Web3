import React, {useState, useEffect, useContext} from 'react'
import contractConv from '../../../contracts/Conversation.json'
import { ContractContext } from '../../../App';
import { ContentContext } from '../../Main/Main';
import "./Header.css";
export default function Header(props) {
  //contexts : 
  const contentContext = useContext(ContentContext)
  const context = useContext(ContractContext)
  //state : 
  const [userAddr, setUserAddr] = useState();
  const [instance, setInstance] = useState();
  //Effects : 
  useEffect(() => {
    getConvContract();
  }, [])

  useEffect(() => {
    getConvContract();
  }, [contentContext])

  useEffect(() => {
    getUserAddr();
  }, [instance])
  
  //Functions:

  const getConvContract = async() =>{
    const instance = await new context.data.web3.eth.Contract(contractConv.abi, contentContext.data.contract);
    setInstance(instance);
  }
  const getUserAddr = async () => { 
    try {
      const addr = await instance.methods.getRecipient().call({from:context.data.owner});
      setUserAddr(addr);
    } catch (error) {
    }  
    
  }
  return (
    <div id='header'>
        <img id="header-img" src='./user.png' />
        <span id='contact-addr'>{userAddr}</span>
    </div>
  )
}
