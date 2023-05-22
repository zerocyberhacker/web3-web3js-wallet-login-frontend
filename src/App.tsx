import React from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {

  const [address,setAddress] = React.useState<string | null>("");

  async function getAccountAddress() {
    // Check if running in a browser environment with access to `window`
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // Create a Web3 instance using the injected provider from Metamask
      const web3 = new Web3(window.ethereum);
  
      // Request and get the current account address
      const accounts = await web3.eth.requestAccounts();
      const publicKey = accounts[0];

      // save wallet address to local storage
      window.localStorage.setItem("userWallet",publicKey)
      setAddress(window.localStorage.getItem("userWallet"));

      console.log(window.localStorage.getItem("userWallet"));

    } else {
      throw new Error('Metamask is not installed or not accessible!');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          className="App-link"
          rel="noopener noreferrer"
          style={{color:"orange"}}
          onClick={getAccountAddress}
        >
          Login
        </button>
        <h4>{address}</h4>
      </header>
    </div>
  );
}

export default App;
