import React, {useState, useEffect, useContext} from 'react'
import './Content.css'
import {ContentContext} from "../Main/Main";
import SendBar from './SendBar/SendBar';
import Header from './Header/Header';
import DisplayMessages from './DisplayMessages/DisplayMessages';
export default function Content() {
  const context = useContext(ContentContext);
  if (context.data.targeted === true) {
    return(
      <div style={{backgroundImage: "url(fond1.webp)"}} id="content">
        <Header data={context.data.contract}/>
        <DisplayMessages data={context.data.contract} />
        <SendBar data ={context.data.contract}/>
      </div>
    )
  } else { 
    return (
      <div id="content">
      </div>
    )
  }
}
