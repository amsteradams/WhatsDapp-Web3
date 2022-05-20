import React,{useContext} from 'react'
import { ContractContext } from '../../../../App'
import "./UserAddress.css";
export default function UserAddress() {
    const context = useContext(ContractContext);
  return (
    <span id='userAddress'>{(context.data.accounts[0]).substr(0,15) + '...'}</span>
  )
}
