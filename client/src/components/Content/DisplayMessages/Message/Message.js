import React,{useContext} from 'react'
import { ContractContext } from '../../../../App';
import timestampFormater from '../../../../utils/timestampFormater';
import "./Message.css";
export default function Message(props) {
  const context = useContext(ContractContext);
  if(props.sender == context.data.owner){
    return(
      <div id='message' >
        <div className='msg-from' id='msg-content'>
          <span id='msg-txt'>{props.txt}</span>
          <span id='msg-time'>{timestampFormater(props.time)}</span>
        </div>
      </div>
    )
  }else{
    return(
      <div id='message'>
        <div className='msg-to' id='msg-content'>
          <span id='msg-txt'>{props.txt}</span>
          <span id='msg-time'>{timestampFormater(props.time)}</span>
        </div>
      </div>
    )
  }
}
