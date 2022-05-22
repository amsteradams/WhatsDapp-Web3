import React, {useState, useEffect, useContext} from 'react'
import "./SendBar.css";
export default function SendBar() {
  const [bool, setBool] = useState(false);
  const [input, setInput] = useState();

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
  return (
    <div id='sendBar'>
        <input onChange={e => {handleChange(e.target.value)}} type='text' id='send-input' placeholder='Write your message'/>
        {bool == true ?<img type="submit" id='send-img' src="./send-valid.png"/> : <img type="submit" id='send-img' src="./send.png"/>}
    </div>
  )
}
