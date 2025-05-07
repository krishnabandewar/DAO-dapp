import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function ProposalList({ daoContract, signer }) {
  const [proposals, setProposals] = useState([]);
  const [votingStates, setVotingStates] = useState({}); // Track voting state per proposal

  useEffect(() => {
    if (daoContract) {
      loadProposals();
    }
  }, [daoContract]);

  const formatDeadline = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  const loadProposals = async () => {
    try {
      const count = await daoContract.numProposals();
      const items = [];

      for (let i = 0; i < count; i++) {
        const p = await daoContract.proposals(i);
        items.push({ 
          id: i, 
          description: p.description,
          deadline: formatDeadline(p.deadline),
          votesFor: ethers.formatUnits(p.voteFor, 0),
          votesAgainst: ethers.formatUnits(p.voteAgainst, 0)
        });
      }
      setProposals(items);
    } catch (error) {
      console.error("Error loading proposals:", error);
    }
  };

  const vote = async (id, support) => {
    try {
      // Set voting state with both proposal ID and vote type
      const stateKey = `${id}-${support ? 'for' : 'against'}`;
      setVotingStates(prev => ({ ...prev, [stateKey]: true }));

      const tx = await daoContract.vote(id, support);
      await tx.wait();
      alert("Vote submitted successfully!");
      loadProposals();
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to vote: " + error.message);
    } finally {
      const stateKey = `${id}-${support ? 'for' : 'against'}`;
      setVotingStates(prev => ({ ...prev, [stateKey]: false }));
    }
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">📝 Active Proposals</h2>
      {proposals.map((p) => (
        <div key={p.id} className="border p-4 rounded mb-4 bg-gray-800">
          <p className="mb-2"><strong>ID:</strong> {p.id}</p>
          <p className="mb-2"><strong>Description:</strong> {p.description}</p>
          <p className="mb-2"><strong>Deadline:</strong> {p.deadline}</p>
          <p className="mb-2"><strong>Votes For:</strong> {p.votesFor}</p>
          <p className="mb-2"><strong>Votes Against:</strong> {p.votesAgainst}</p>
          <div className="flex gap-2">
            <button 
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50" 
              onClick={() => vote(p.id, true)}
              disabled={votingStates[`${p.id}-for`]}
            >
              {votingStates[`${p.id}-for`] ? 'Voting...' : 'Vote For'}
            </button>
            <button 
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50" 
              onClick={() => vote(p.id, false)}
              disabled={votingStates[`${p.id}-against`]}
            >
              {votingStates[`${p.id}-against`] ? 'Voting...' : 'Vote Against'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProposalList;