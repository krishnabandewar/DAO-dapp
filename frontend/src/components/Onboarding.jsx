import React from 'react';

function Onboarding({ onComplete }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to ModerDAO</h2>
      
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">How Voting Works</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Each member gets 100 MTKN tokens upon registration</li>
            <li>1 MTKN = 1 Vote</li>
            <li>Tokens cannot be transferred to other users</li>
            <li>Proposals need majority to pass</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Community Guidelines</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Vote based on community standards</li>
            <li>Each user can vote once per proposal</li>
            <li>Voting period lasts 3 days</li>
            <li>Results are automatically executed</li>
          </ul>
        </div>

        <button 
          onClick={onComplete}
          className="btn-primary w-full"
        >
          I Understand - Start Voting
        </button>
      </div>
    </div>
  );
}

export default Onboarding;