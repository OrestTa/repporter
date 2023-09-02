# Repporter

Reporter lets you verifiably port your web2 social reputation to web3 by proving onchain that you control a web2 identity. Repporter creates onchain attestations that map OAuth identities and a wallet address. A user is required to login and sign a message. The message is then stored in the repporter contract. The user receives a receipt that proves that repporter attested the mapping. The attestation can be externally verified by auditing the open source frontend code of the attestation and comparing the  

The main advantage of repporter is it's simple and lightweight implementation. All that is needed to verify whether the same entity controls the two identities is a transaction hash. This hash proves that the repporter smart contract has signed a message that maps the two identities. The mapping mechanism relies on an open-source frontend that can be audited and verified and standard firebase functionalities. Whilst this requires some trust, it is minimised through open-sourcing and a frontend-heavy implementation. The trust that is needed is that the Repporter backend correctly verifies the OAuth token. 

# Use Cases

As an end-user, you can provide a simple receipt that proves that you control a specific web2 handle. More importantly, other projects can easily ask users to verify that they control a handle in order to verify their web2 identity. The use cases for businesses are vast: from airdrop management to multi-factor authentication for large payments.

# Demo

# Links
https://ethwarsaw-2023.devpost.com/

# Submission Details

Team: 
[Devpost: konradeurban](https://devpost.com/konradeurban), kkonrad.eth
[Devpost: OrestTa](https://devpost.com/OrestTa) orestta.eth
[Devpost: igor543](https://devpost.com/igor543) 0xc64E64BFc893d8C5787DDEFD818e2A843690EF3E

# License

Unlicense

# Smart Contract

See [/contract](/contract)
    