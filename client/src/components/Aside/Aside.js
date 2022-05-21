import React, {useState, useEffect, createContext, useContext} from 'react'
import './Aside.css';
import cManager from "../../contracts/Manager.json";
import Bandeau from './Bandeau/Bandeau';
import { ContractContext } from '../../App';
import NewConv from './NewConv/NewConv';
import Conversations from '../Aside/Conversations/Conversations.js';

export const AsideContext = createContext();

export default function Aside() {
  const context= useContext(ContractContext);
  const [newMessage, setNewMessage] =useState(false);
  const [asideData, setAsideData] = useState({
    manager:null
  })

  useEffect(() => {
    getManager();
  }, [])

  const getManager = async () => {
    try {
      const manager = new context.data.web3.eth.Contract(
        cManager.abi, context.data.manager
      ) 
      setAsideData({manager:manager})
    } catch (error) {
      console.error(error);
    }
  }


  if(!asideData.manager){
    return(
      <div id='aside'>
        Connection error
      </div>
    )
  }
  return (
    <AsideContext.Provider value={{asideData, setAsideData, setNewMessage, newMessage}}>
      <div id="aside">
            <Bandeau />
            {newMessage == true ? <NewConv /> : ""}
            <Conversations />
      </div>
    </AsideContext.Provider>
  )
}
