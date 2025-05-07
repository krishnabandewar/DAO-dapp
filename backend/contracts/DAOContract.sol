// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IToken {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract DAOContract {
    struct Proposal {
        string description;
        string image;
        uint256 voteFor;
        uint256 voteAgainst;
        uint256 deadline;
        bool executed;
    }

    IToken public token;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => bool) public registeredUsers;
    mapping(address => bool) public hasReceivedTokens;
    uint256 public numProposals;
    uint256 public constant INITIAL_TOKENS = 100 * 10**18; // 100 tokens

    // Event to track registrations
    event UserRegistered(address user, uint256 amount);

    // Event to track token distribution
    event InitialTokensDistributed(address user, uint256 amount);

    constructor(address tokenAddress) {
        token = IToken(tokenAddress);
    }

    modifier onlyTokenHolder() {
        require(token.balanceOf(msg.sender) > 0, "Not a token holder");
        _;
    }

    function createProposal(string memory _desc, string memory _image) external onlyTokenHolder {
        proposals[numProposals++] = Proposal(_desc, _image, 0, 0, block.timestamp + 3 days, false);
    }

    function vote(uint256 proposalId, bool support) external onlyTokenHolder {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        uint256 weight = token.balanceOf(msg.sender);
        if (support) {
            proposal.voteFor += weight;
        } else {
            proposal.voteAgainst += weight;
        }
        hasVoted[proposalId][msg.sender] = true;
    }

    function getProposal(uint256 proposalId) external view returns (
        string memory description,
        string memory image,
        uint256 voteFor,
        uint256 voteAgainst,
        uint256 deadline,
        bool executed
    ) {
        Proposal memory p = proposals[proposalId];
        return (p.description, p.image, p.voteFor, p.voteAgainst, p.deadline, p.executed);
    }

    // Registration function that checks criteria
    function register() external {
        require(!registeredUsers[msg.sender], "Already registered");
        
        // Add your criteria here, for example:
        // - Account age
        // - Previous participation
        // - KYC verification
        // - Social proof
        
        registeredUsers[msg.sender] = true;
        require(token.transfer(msg.sender, INITIAL_TOKENS), "Token transfer failed");
        emit UserRegistered(msg.sender, INITIAL_TOKENS);
    }

    // Function to give initial tokens to new users
    function giveInitialTokens() external {
        require(!hasReceivedTokens[msg.sender], "Already received initial tokens");
        require(token.transfer(msg.sender, INITIAL_TOKENS), "Token transfer failed");
        hasReceivedTokens[msg.sender] = true;
        emit InitialTokensDistributed(msg.sender, INITIAL_TOKENS);
    }
}
