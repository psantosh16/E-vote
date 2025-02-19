// components/ProposalList.js
import { useEffect, useState } from 'react';
import { getContract } from '../utils/contract';

const ProposalList = ({ provider }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const contract = getContract(provider);
      const nextProposalId = await contract.nextProposalId();
      const proposalsArray = [];
      for (let i = 0; i < nextProposalId; i++) {
        const proposal = await contract.proposals(i);
        proposalsArray.push(proposal);
      }
      setProposals(proposalsArray);
    };

    if (provider) {
      fetchProposals();
    }
  }, [provider]);

  return (
    <div>
      <h2>Proposals</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            {proposal.name} - Votes: {proposal.voteCount.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalList;
