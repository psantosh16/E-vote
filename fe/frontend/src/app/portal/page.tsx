'use client';

import React, { useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import ProposalList from '../../components/ProposalList';

const Portal = () => {
    let provider;
    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' });
        }
        provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_PROVIDER);
    }, []);
    
    return (
        <div>
            <ProposalList provider={provider} />
        </div>
    );
}

export default Portal;
