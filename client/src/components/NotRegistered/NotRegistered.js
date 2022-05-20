import React, {useContext} from 'react'
import { ContractContext } from '../../App';
import './NotRegistered.css';
export default function NotRegistered() {
    const context = useContext(ContractContext);

    const start = async () => {
        await context.data.contract.methods.newAccount().send({from:context.data.owner});
    }
  return (
    <div id="app">
        <div id="main-unregistered">
            <img id='whatsdapp-logo' src='./whatsdapp-grey-icon.png'></img>
            <button onClick={start} id='join'>Start</button>
        </div>
    </div>
  )
}
