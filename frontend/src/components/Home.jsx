import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home({ account, tokenContract, transferTokensToDAO }) {
  const [tokenAmount, setTokenAmount] = useState('');
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-24"
      >
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400"
            >
              Decentralized Community Moderation
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8">
              Empower your community with transparent, democratic content governance powered by blockchain technology
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/propose" className="btn-primary">
                Create Proposal
              </Link>
              <Link to="/vote" className="btn-secondary">
                View Proposals
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Design Principles Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Design Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description: "All proposals and voting records are permanently stored on the blockchain for complete transparency.",
                icon: "🔍"
              },
              {
                title: "Decentralization",
                description: "No central authority - decisions are made collectively by token holders.",
                icon: "🌐"
              },
              {
                title: "Token-Weighted Voting",
                description: "Voting power is proportional to token holdings, ensuring skin in the game.",
                icon: "⚖️"
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="card"
              >
                <div className="text-3xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                <p className="text-gray-400">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Voting Power Calculator */}
      <div className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
              Voting Power Calculator
            </h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                Calculate your voting power based on your token holdings
              </p>
              <div className="flex gap-4 mb-4">
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="Enter token amount"
                  className="input flex-grow"
                />
                <div className="bg-blue-900/30 px-6 py-2 rounded-lg flex items-center">
                  <span className="text-blue-400 font-semibold">
                    = {tokenAmount || '0'} Votes
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                1 MTKN = 1 Vote. The more tokens you hold, the greater your influence on proposals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add the transfer button only if account exists and is the owner */}
      {account && (
        <div className="mt-8 text-center">
          <button
            onClick={transferTokensToDAO}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Transfer Tokens to DAO
          </button>
        </div>
      )}

      {/* Call-to-Action Footer */}
      <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Ready to Participate?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our decentralized governance platform and help shape the future of community moderation.
          </p>
          <div className="flex justify-center gap-6">
            <Link 
              to="/propose"
              className="btn-primary"
            >
              Create Your First Proposal
            </Link>
            <a 
              href="https://docs.openzeppelin.com/contracts/4.x/governance"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Read Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;