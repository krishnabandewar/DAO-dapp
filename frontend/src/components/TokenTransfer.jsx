import React, { useState } from 'react';
import { ethers } from 'ethers';

function TokenTransfer({ tokenContract }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      setIsTransferring(true);
      const tx = await tokenContract.transfer(
        recipient,
        ethers.parseUnits(amount, 18) // Assuming 18 decimals for MTKN
      );
      await tx.wait();
      alert('Tokens transferred successfully!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Failed to transfer tokens: ' + error.message);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Transfer Tokens</h2>
      <form onSubmit={handleTransfer}>
        <input
          type="text"
          className="input mb-4 w-full"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="number"
          className="input mb-4 w-full"
          placeholder="Amount of MTKN"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isTransferring}
        >
          {isTransferring ? 'Transferring...' : 'Transfer Tokens'}
        </button>
      </form>
    </div>
  );
}

export default TokenTransfer;