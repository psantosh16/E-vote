// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title A Voting Contract with Real-Time Result Retrieval
contract Voting {
    struct Proposal {
        uint256 id; // Unique identifier for the proposal
        string name; // Name of the proposal
        uint256 voteCount; // Number of votes the proposal has received
    }

    address public admin; // Address of the contract administrator
    uint256 public nextProposalId; // Counter for assigning unique IDs to proposals
    uint256 public votingStartTime; // Timestamp when voting starts
    uint256 public votingEndTime; // Timestamp when voting ends

    mapping(uint256 => Proposal) public proposals; // Mapping of proposal ID to Proposal
    mapping(address => bool) public hasVoted; // Tracks if an address has voted

    // Modifier to restrict function access to only the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action.");
        _;
    }

    // Modifier to ensure that voting is active
    modifier whenVotingActive() {
        require(isVotingActive(), "Voting is not active.");
        _;
    }

    // Event emitted when a new proposal is added
    event ProposalAdded(uint256 id, string name);
    // Event emitted when a vote is cast
    event Voted(uint256 proposalId, address voter);
    // Event emitted when voting starts
    event VotingStarted(uint256 startTime, uint256 endTime);

    /// @notice Constructor to initialize the contract with initial proposals
    /// @param initialProposals An array of proposal names to initialize
    constructor(string[] memory initialProposals) {
        admin = msg.sender; // Set the contract deployer as the admin
        for (uint256 i = 0; i < initialProposals.length; i++) {
            addProposal(initialProposals[i]);
        }
    }

    /// @notice Function to add a new proposal
    /// @dev Can only be called by the admin
    /// @param proposalName The name of the new proposal
    function addProposal(string memory proposalName) public onlyAdmin {
        proposals[nextProposalId] = Proposal({
            id: nextProposalId,
            name: proposalName,
            voteCount: 0
        });
        emit ProposalAdded(nextProposalId, proposalName);
        nextProposalId++;
    }

    /// @notice Function to start the voting process
    /// @dev Can only be called by the admin
    /// @param durationInMinutes The duration for which voting will be active
    function startVoting(uint256 durationInMinutes) public onlyAdmin {
        votingStartTime = block.timestamp;
        votingEndTime = votingStartTime + (durationInMinutes * 1 minutes);
        emit VotingStarted(votingStartTime, votingEndTime);
    }

    /// @notice Function to check if voting is currently active
    /// @return bool indicating if voting is active
    function isVotingActive() public view returns (bool) {
        return
            block.timestamp >= votingStartTime &&
            block.timestamp <= votingEndTime;
    }

    /// @notice Function to cast a vote for a proposal
    /// @param proposalId The ID of the proposal to vote for
    function vote(uint256 proposalId) public whenVotingActive {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(proposals[proposalId].id == proposalId, "Invalid proposal ID.");

        proposals[proposalId].voteCount += 1;
        hasVoted[msg.sender] = true;
        emit Voted(proposalId, msg.sender);
    }

    /// @notice Function to retrieve the current results of all proposals
    /// @return proposalNames An array of proposal names
    /// @return voteCounts An array of vote counts corresponding to each proposal
    function getCurrentResults()
        public
        view
        returns (string[] memory proposalNames, uint256[] memory voteCounts)
    {
        proposalNames = new string[](nextProposalId);
        voteCounts = new uint256[](nextProposalId);
        for (uint256 i = 0; i < nextProposalId; i++) {
            proposalNames[i] = proposals[i].name;
            voteCounts[i] = proposals[i].voteCount;
        }
    }

    /// @notice Function to retrieve the proposal with the highest vote count
    /// @return winnerName The name of the winning proposal
    /// @return winnerVoteCount The number of votes the winning proposal received
    function getFinalResults()
        public
        view
        returns (string memory winnerName, uint256 winnerVoteCount)
    {
        require(!isVotingActive(), "Voting is still active.");
        uint256 winningVoteCount = 0;
        for (uint256 i = 0; i < nextProposalId; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winnerName = proposals[i].name;
                winnerVoteCount = winningVoteCount;
            }
        }
    }
}
