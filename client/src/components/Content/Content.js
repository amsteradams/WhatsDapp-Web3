import React, {useState, useEffect, useContext} from 'react'
import './Content.css'
import {ContentContext} from "../Main/Main";
export default function Content() {
  const context = useContext(ContentContext);
  console.log(context)
  if (context.data.targeted === true) {
    return(
      <div /* style={{backgroundImage: "url(fond.jpg)"}} */ id="content">
      
      </div>
    )
  } else { 
    return (
      <div id="content">
      </div>
    )
  }
}
