import React, {useState, useEffect, useContext, createContext} from 'react'
import Aside from '../Aside/Aside';
import Content from '../Content/Content';
import "./Main.css";

export const ContentContext = createContext();

export default function Main() {
  const [data, setData] = useState({
    targeted:false,
    contract:null
  })

  const setContext = (bool, contract) => {
    setData({
      targeted:bool,
      contract:contract
    })
  }

  return (
    <ContentContext.Provider value={{data, setContext}}>
      <div id='main'>
          <Aside />
          <Content />
      </div>
    </ContentContext.Provider>
  )
}
