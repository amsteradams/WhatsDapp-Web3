import React,{useEffect, useState, useContext} from 'react'
import timestampFormater from '../../../../utils/timestampFormater';
import { ContentContext } from '../../../Main/Main';
import "./Conversation.css";
export default function Conversation(props) {
  const contentContext = useContext(ContentContext);
  const [time, setTime] = useState();
  useEffect(() => {
    translateDate();
  }, [])
  
  const translateDate = () => {
    const time = timestampFormater(props.startedAt);
    setTime(time);
  }

  const displayConv = () => {
    contentContext.setContext(true, props.contract);
  }

  return (
    <div onClick={displayConv} id='conversation'>
      <div id='left-part'>
        <img src='./user.png'/>
      </div>
      <div id='right-part'>
        <div id='central-part'>
          <span id='conv-to'>{(props.to).substr(0, 7)}...</span>
          <span id='conv-msg'>{props.lastMessage}</span>
        </div>
          <span id='conv-time'>{time}</span>
      </div>
    </div>
  )
}
