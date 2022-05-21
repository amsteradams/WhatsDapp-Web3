import React, {useState, useContext, useEffect} from 'react'
import { ContractContext } from '../../../App';
import { AsideContext } from '../Aside';
import './NewConv.css';
export default function NewConv() {
    const context = useContext(ContractContext);
    const contextAside = useContext(AsideContext);
    const [input, setInput] = useState();
    const [bool, setBool] = useState(false);
    const [error, setError] = useState(true);
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

    useEffect( async() => {
        try {
            await context.data.contract.methods.getManagerOf(input).call({from:context.data.owner});
            setError(false)
        } catch (error) {
            setError(true);
        }
    }, [input])
    
    console.log(input);
    console.log(error);
    const addConv = async () => {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        try {
            if(regex.test(input) == false){
                alert('Address is not valid')
            }
            else if(regex.test(input) == true && error == true){
                alert('Your friend is not on whatsDapp')
            }
            else if(input === context.data.owner){
                alert("You can't message yourself")
            }
            else{
                await contextAside.asideData.manager.methods.newConv(input).send({from:context.data.owner});    
            }
        } catch (error) {
            console.log(error);
        }
        
    }

  return (
        <form id='form-newConv'>
            <input onChange={e => {handleChange(e.target.value)}} id='input-newConv' type='text' placeholder='Address'>
            </input>
            <img id='input-img' src="./search.png"/>
            {bool == true && error == false?<img onClick={addConv} id='input-img-new' src="./send-valid.png"/> : ""}
            {bool == true && error == true? <img style={{cursor:'not-allowed'}}  id='input-img-new' class='disabled' src="./send.png"/> : ""}
        </form>
  )
}
