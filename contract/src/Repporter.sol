// SPDX-License-Identifier: GPL-3.0
// Starting from remix.ethereum.org templates

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Repporter
 * @dev Implements the repporter
 */
contract Repporter {
    address public owner;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;        
    }

    mapping (address => mapping (string => string)) private useraddressesAddresslinks;

    /** 
     * @dev Create a Repporter
     */
    constructor() {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    // TODO: Add usersignature
    function addLinkForUser(address useraddress, string calldata linkType, string calldata linkValue) public isOwner {
        useraddressesAddresslinks[useraddress][linkType] = linkValue;
    }

    function getLinkForUser(address useraddress, string calldata linkType) external view returns (string memory) {
        return useraddressesAddresslinks[useraddress][linkType];
    }
}
