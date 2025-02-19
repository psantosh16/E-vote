// utils/contract.js
import { ethers } from 'ethers';
import Voting from '../abi/Voting.json';


// Replace YOUR_CONTRACT_ADDRESS_HERE with the deployed contract address
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';

export const getContract = (provider) => {
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, Voting.abi, signer);
};
