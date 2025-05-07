import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar({ account, balance }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-white';
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-4 md:py-0">
          {/* Center-aligned logo and navigation */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
            <Link to="/" className="flex items-center mb-4 md:mb-0">
              <span className="text-3xl mr-2">🏛️</span>
              <span className="font-bold text-2xl gradient-text">ModerDAO</span>
            </Link>
            <div className="flex items-center space-x-8 mx-8">
              <Link to="/propose" className={`${isActive('/propose')} transition-colors duration-200`}>
                Propose
              </Link>
              <Link to="/vote" className={`${isActive('/vote')} transition-colors duration-200`}>
                Vote
              </Link>
              <Link to="/results" className={`${isActive('/results')} transition-colors duration-200`}>
                Results
              </Link>
            </div>
          </div>

          {/* Right-aligned wallet info */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
              <span className="text-gray-400">Balance:</span>
              <span className="ml-2 text-blue-400">{balance} MTKN</span>
            </div>
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm">
              {account ? 
                `${account.slice(0, 6)}...${account.slice(-4)}` : 
                'Not Connected'
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;