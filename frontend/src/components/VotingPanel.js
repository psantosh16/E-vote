// components/VotingPanel.js
import { useEffect, useState } from 'react';
import { getContract } from '../utils/contract';

const VotingPanel = ({ provider }) => {
  const [votingActive, setVotingActive] = useState(false);
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkVotingStatus = async () => {
      const contract = getContract(provider);
      const isActive = await contract.isVotingActive();
      setVotingActive(isActive);
    };

    if (provider) {
      checkVotingStatus();
    }
  }, [provider]);

  const startVoting = async () => {
    if (!duration) {
      setMessage('Please enter a duration.');
      return;
    }

    const contract = getContract(provider);
    const tx = await contract.startVoting(duration);
    await tx.wait();
    setVotingActive(true);
    setMessage('Voting has started.');
  };

  return (
    <div>
      {votingActive ? (
        <p>Voting is currently active.</p>
      ) : (
        <div>
          <input
            type="number"
            placeholder="Duration in minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button onClick={startVoting}>Start Voting</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default VotingPanel;
