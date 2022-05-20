import React, { useState, useEffect, createContext } from "react";
import WhatsDappContract from "./contracts/WhatsDapp.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import Main from "./components/Main/Main";
import NotRegistered from "./components/NotRegistered/NotRegistered";

export const ContractContext = createContext();

const App = () => {
  const [data, setData] = useState({
    web3: null,
    accounts: null,
    contract: null,
    owner:null,
    manager:null
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const owner = accounts[0];
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WhatsDappContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WhatsDappContract.abi,
        deployedNetwork && deployedNetwork.address,
        );
        let manager= null;
      try {
        manager = await instance.methods.getManagerOf(owner).call({from:owner});        
      } catch (error) {
        manager = null;
      }  
        setData({web3, accounts, contract: instance, owner: owner,manager:manager});

        //::::::::::::::::::::::::::EVENTS::::::::::::::::::::::::::

        //event NewUser from WhatsDapp.sol
        await instance.events.NewUser()
          .on('data', event => {
            if(event.returnValues._user == owner){
              window.location.reload();
            }
            })
          .on('changed', changed => console.log(changed))
          // .on('error', err => throw err)
          .on('connected', str => console.log(str))
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.log(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
  };
  if(data.web3 && data.manager){
    return (
      <ContractContext.Provider value={{ data, setData }}>
        <div id='app'>
          <Main />
        </div>
      </ContractContext.Provider>
    );
  }
  else if(data.web3){
    return(
      <ContractContext.Provider value={{data, setData}}>
        <NotRegistered />
      </ContractContext.Provider>
    )
  }
  else{
    return (
        <div className="app-notwork">
          Web3 Connection failed
        </div>
    )
  }
  
}

export default App;