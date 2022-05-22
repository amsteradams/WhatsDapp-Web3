import React, {useState, useEffect, useContext} from 'react'
import './Content.css'
import {ContentContext} from "../Main/Main";
import SendBar from './SendBar/SendBar';
export default function Content() {
  const context = useContext(ContentContext);
  console.log(context)
  if (context.data.targeted === true) {
    return(
      <div style={{backgroundImage: "url(fond1.webp)"}} id="content">
        <SendBar />
      </div>
    )
  } else { 
    return (
      <div id="content">
      </div>
    )
  }
}
