// components/ConnectWalletButton.js
import { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const ConnectWalletButton = ({ onConnect }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();
    setAccount(accounts[0]);
    onConnect(provider);
  };

  return (
    <div>
      {account ? (
        <p>Connected as: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
