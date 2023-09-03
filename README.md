# Repporter

Repporter lets you verifiably port your web2 social reputation to web3 by proving onchain that you control a web2 identity. Repporter creates onchain attestations that map OAuth identities and a wallet address for you or anyone else to view. Here's how it works:

1. A user visits the Repporter dApp, hosted e.g. at https://repporter.netlify.app .
2. In order to port their reputation, the user is required to login using a web2 platform AND also sign a message using their web3 wallet.
3. Repporter verifies the web2 login and the web3 identity, and proceeds to store this attested mapping onchain.
4. The user receives a receipt that shows that Repporter attested the mapping. 
5. Any user can now view the web2 identity of a given web3 address.

Bonus: The attestation can be externally verified by auditing the open source frontend code of the attestation.

The main advantage of Repporter is it's simple and lightweight implementation. All that is needed to verify whether the same entity controls the two identities is a transaction hash. This hash proves that the Repporter smart contract has signed a message that maps the two identities. The mapping mechanism relies on an open-source smart contract, frontend and backend, using standard OAuth functionalities for the centralised web2 service interaction. Whilst this requires some trust, it is reduced through open-sourcing and a frontend-heavy implementation. The trust that is needed is that the Repporter backend correctly verifies the OAuth token.

Why care about UX?


# Use Cases

As an end-user, you can provide a simple receipt that proves that you control a specific web2 handle. More importantly, other projects can easily ask users to verify that they control a handle in order to verify their web2 identity. The use cases for businesses are vast: from airdrop management to multi-factor authentication for large payments.

# Future Improvements

[ ] Onchain storage and verifiable compute of user signature
[ ] Attesting as Ethereum Attestation Service
[ ] Additional web2 identities' support
[ ] Additional networks' support
[ ] Require users to pay for the gas needed to update their links
[ ] Input validation, error handling
[ ] Use a less trusted model, e.g. via zk

# Demo

- https://repporter.netlify.app


# Links
https://ethwarsaw-2023.devpost.com/

# Submission Details

Team: 

- [Devpost: konradeurban](https://devpost.com/konradeurban), kkonrad.eth
- [Devpost: OrestTa](https://devpost.com/OrestTa), orestta.eth
- [Devpost: igor543](https://devpost.com/igor543), 0xc64E64BFc893d8C5787DDEFD818e2A843690EF3E

Tweets:

- TBA (at https://twitter.com/0xkkonrad )

# License

GPLv3

# Module Documentation

- [Frontend](/frontend)
- [Backend](/backend)
- [Smart Contract](/contract)
