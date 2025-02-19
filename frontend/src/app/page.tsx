// pages/index.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Home = () => {
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
        // Redirect to the portal page after connection
        router.push('/portal');
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <h1>Welcome to the Voting Portal</h1>
      {!walletConnected && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Home;
