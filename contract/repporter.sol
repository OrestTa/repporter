// SPDX-License-Identifier: GPL-3.0
// from remix.ethereum.org

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Repporter
 * @dev Implements the repporter
 */
contract Repporter {
    address public chairperson; // this contract's deployer

    uint public quorumInFavour;
    uint public votesInFavour = 0;
    uint public votesAgainst = 0;
    uint public votesAbstaining = 0;

    mapping (bytes32 nullifier => bool nullifierExists) public nullifiers;

    /** 
     * @dev Create a new ballot
     * @param quorumInFavour_ the minimum number of yes-votes (0) for the ballot to be deemed accepted; 
     *   can be expanded to support other proposal types (no (1), abstain (2))
     */
    constructor(uint quorumInFavour_) {
        chairperson = msg.sender;
        quorumInFavour = quorumInFavour_;
    }

    /**
     * @dev Give your vote
     * @param proposalType set to 0 to vote for yes, to 1 for no, to 2 for abstain
     * @param zkProof to verify the vote
     * @param nullifier to avoid double-voting
     */
    function vote(uint8 proposalType, bytes32 zkProof, bytes32 nullifier) public {
        if (nullifiers[nullifier]) {
            revert("Voter has already voted");
        }
    
        bool zkProofIsValid = true; /* TODO: Verify zkProof using generated verifier contract */
        if (!zkProofIsValid) {
            revert("Provided zkProof is not valid");
        }

        nullifiers[nullifier]=true;

        if (proposalType==0) {
            votesInFavour++;
        }
        if (proposalType==1) {
            votesAgainst++;
        }
        if (proposalType==2) {
            votesAbstaining++;
        }
    }

    /**
     * @dev Check if the ballot's in-favour votes passed the required in-favour quorum
     */
    function ballotWasAccepted() public view 
        returns (bool accepted) 
        {
            return votesInFavour >= quorumInFavour;
        }
}
