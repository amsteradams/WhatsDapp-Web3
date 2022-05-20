import React, {useContext} from 'react'
import { AsideContext } from '../Aside'
import './Bandeau.css'
import UserAddress from './UserAddress/UserAddress'
export default function Bandeau() {
  const context = useContext(AsideContext);
  return (
    <div id="bandeau">
            <img id='pp' src='./user.png' />
            <UserAddress />
        <div id='icons'>
            <img className='bandeau-icons' src='./status.png' />
            <img onClick={() => {context.setNewMessage(!context.newMessage)}} className='bandeau-icons' src='./message.png' />
            <img className='bandeau-icons' src='./more.png' />
        </div>
    </div>
  )
}
