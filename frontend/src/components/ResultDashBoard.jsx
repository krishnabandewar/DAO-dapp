import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function ResultDashboard({ daoContract }) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if (daoContract) {
      loadResults();
    }
  }, [daoContract]);

  const formatVotes = (votes) => {
    return Number(ethers.formatUnits(votes, 0)).toLocaleString();
  };

  const loadResults = async () => {
    try {
      if (!daoContract) return;
      
      const count = await daoContract.numProposals();
      const items = [];

      for (let i = 0; i < count; i++) {
        const proposal = await daoContract.proposals(i);
        const votesFor = ethers.formatUnits(proposal.voteFor, 0);
        const votesAgainst = ethers.formatUnits(proposal.voteAgainst, 0);
        const isApproved = Number(votesFor) > Number(votesAgainst);
        
        items.push({
          id: i,
          description: proposal.description,
          votesFor: formatVotes(proposal.voteFor),
          votesAgainst: formatVotes(proposal.voteAgainst),
          result: isApproved
        });
      }
      setProposals(items);
    } catch (error) {
      console.error("Error loading results:", error);
    }
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">📊 Results Dashboard</h2>
      {proposals.map((proposal) => (
        <div key={proposal.id} className="border p-4 rounded mb-4 bg-gray-800">
          <p className="mb-2"><strong>ID:</strong> {proposal.id}</p>
          <p className="mb-2"><strong>Description:</strong> {proposal.description}</p>
          <p className="mb-2"><strong>Votes For:</strong> {proposal.votesFor}</p>
          <p className="mb-2"><strong>Votes Against:</strong> {proposal.votesAgainst}</p>
          <p className={`font-bold ${proposal.result ? 'text-green-500' : 'text-red-500'}`}>
            Status: {proposal.result ? 'Approved' : 'Rejected'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ResultDashboard;