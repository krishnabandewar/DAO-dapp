import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from './config';
import GovernanceToken from './contracts/GovernanceToken.json';
import DAOContract from './contracts/DAO.json';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import ResultDashboard from './components/ResultDashboard';
import TokenTransfer from './components/TokenTransfer';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");
  const [tokenContract, setTokenContract] = useState(null);
  const [daoContract, setDaoContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum && !isConnecting) {
      try {
        setIsConnecting(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected address:", address);
        console.log("Using DAO contract:", CONTRACT_ADDRESSES.DAO);
        console.log("Using Token contract:", CONTRACT_ADDRESSES.TOKEN);

        const dao = new ethers.Contract(
          CONTRACT_ADDRESSES.DAO,
          DAOContract.abi,
          signer
        );

        const token = new ethers.Contract(
          CONTRACT_ADDRESSES.TOKEN,
          GovernanceToken.abi,
          signer
        );

        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setDaoContract(dao);
        setTokenContract(token);

        // Check balance
        const bal = await token.balanceOf(address);
        const balanceNumber = Number(ethers.formatUnits(bal, 18));
        console.log("Current balance:", balanceNumber);
        
        // Update balance state
        setBalance(balanceNumber.toString());

        // Check DAO contract balance
        const daoBalance = await token.balanceOf(CONTRACT_ADDRESSES.DAO);
        console.log("DAO contract balance:", ethers.formatUnits(daoBalance, 18));

        // Only try to register if balance is 0
        if (balanceNumber === 0) {
          try {
            console.log("New user detected, attempting to register...");
            // Check if DAO has enough tokens first
            if (daoBalance < ethers.parseUnits("100", 18)) {
              alert("DAO contract needs tokens to distribute. Please contact admin.");
              return;
            }
            
            const tx = await dao.register();
            console.log("Registration transaction sent:", tx.hash);
            await tx.wait();
            console.log("Registration confirmed");
            
            // Update balance after registration
            const newBal = await token.balanceOf(address);
            const newBalanceNumber = Number(ethers.formatUnits(newBal, 18));
            setBalance(newBalanceNumber.toString());
            
            alert("Welcome! You've received 100 MTKN tokens to participate in voting.");
          } catch (error) {
            console.error("Registration error:", error);
            if (error.message.includes("execution reverted")) {
              alert("Failed to register - DAO contract may not have enough tokens. Please contact admin.");
            } else if (error.message.includes("Already registered")) {
              alert("This address is already registered.");
            } else {
              alert("Failed to register: " + error.message);
            }
          }
        }

      } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect wallet: " + error.message);
      } finally {
        setIsConnecting(false);
      }
    } else if (!window.ethereum) {
      alert("Please install MetaMask to use this dApp!");
    }
  };

  const transferTokensToDAO = async () => {
    try {
      // Amount to transfer (e.g., 1000 tokens = 1000 * 10^18)
      const amount = ethers.parseUnits("1000", 18);
      
      console.log("Transferring tokens to DAO contract...");
      const tx = await tokenContract.transfer(CONTRACT_ADDRESSES.DAO, amount);
      console.log("Transfer transaction sent:", tx.hash);
      
      await tx.wait();
      console.log("Transfer confirmed!");
      
      // Check new DAO balance
      const daoBalance = await tokenContract.balanceOf(CONTRACT_ADDRESSES.DAO);
      console.log("New DAO balance:", ethers.formatUnits(daoBalance, 18));
      
      alert("Successfully transferred 1000 tokens to DAO contract!");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Failed to transfer tokens: " + error.message);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <NavBar account={account} balance={balance} />
        
        {!account ? (
          <div className="container mx-auto px-4 py-8 text-center">
            <button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-semibold"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        ) : (
          <div className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={
                <Home 
                  tokenContract={tokenContract}
                  account={account}
                  transferTokensToDAO={transferTokensToDAO}
                />
              } />
              <Route path="/propose" element={<ProposalForm daoContract={daoContract} />} />
              <Route path="/vote" element={<ProposalList daoContract={daoContract} signer={signer} />} />
              <Route path="/results" element={<ResultDashboard daoContract={daoContract} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;