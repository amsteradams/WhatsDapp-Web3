import React from 'react'
import './Bandeau.css'
export default function Bandeau() {
  return (
    <div id="bandeau">
            <img id='pp' src='./user.png' />
        <div id='icons'>
            <img class='bandeau-icons' src='./status.png' />
            <img class='bandeau-icons' src='./message.png' />
            <img class='bandeau-icons' src='./more.png' />
        </div>
    </div>
  )
}
