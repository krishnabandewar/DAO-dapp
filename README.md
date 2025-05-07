# ModerDAO - Decentralized Content Moderation Platform

A decentralized autonomous organization (DAO) for community-driven content moderation built with Ethereum smart contracts and React.

## Features

- **Token-Based Governance**: Uses MTKN tokens for voting rights
- **Transparent Decision Making**: All proposals and votes stored on-chain
- **Automated Token Distribution**: New users receive 100 MTKN tokens
- **Proposal Management**: Create, vote on, and track content moderation proposals
- **Real-time Results**: Live tracking of voting outcomes

## Tech Stack

- Frontend: React, TailwindCSS, ethers.js
- Smart Contracts: Solidity, OpenZeppelin
- Development: Hardhat, Vite
- Network: Sepolia Testnet

## Smart Contracts (Sepolia)

- DAO Contract: `0xaAae5073a36b0ff52837C88980b5bc3cfe33aE2e`
- Token Contract: `0x8Df9F26235C9080cD9Bc079725e096370325bb91`

## Prerequisites

- Node.js >= 14
- MetaMask wallet
- Sepolia testnet ETH

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dao-dapp.git
cd dao-dapp
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Configuration

1. Create `.env` file in backend directory:
```env
QUICKNODE_URL=your_quicknode_url
PRIVATE_KEY=your_wallet_private_key
```

2. Create `.env` file in frontend directory:
```env
VITE_QUICKNODE_URL=your_quicknode_url
```

## Development

1. Start local hardhat node (optional):
```bash
cd backend
npx hardhat node
```

2. Deploy contracts:
```bash
cd backend
npx hardhat run scripts/deploy.js --network sepolia
```

3. Start frontend development server:
```bash
cd frontend
npm run dev
```

## Usage

1. Connect MetaMask wallet
2. New users automatically receive 100 MTKN tokens
3. Create proposals for content moderation
4. Vote on active proposals
5. View results in the dashboard

## Contract Functions

### DAO Contract

- `register()`: Register new user and receive tokens
- `createProposal(string desc, string image)`: Create new proposal
- `vote(uint256 proposalId, bool support)`: Vote on proposal
- `getProposal(uint256 proposalId)`: Get proposal details

### Token Contract (MTKN)

- Standard ERC20 implementation
- Initial supply: 1,000,000 MTKN
- Automatic distribution: 100 MTKN per new user

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

MIT License
