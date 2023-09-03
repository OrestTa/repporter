# Repporter

Reporter lets you verifiably port your web2 social reputation to web3 by proving onchain that you control a web2 identity. Repporter creates onchain attestations that map OAuth identities and a wallet address. A user is required to login and sign a message. The message is then stored in the repporter contract. The user receives a receipt that proves that repporter attested the mapping. The attestation can be externally verified by auditing the open source frontend code of the attestation and comparing the  

The main advantage of repporter is it's simple and lightweight implementation. All that is needed to verify whether the same entity controls the two identities is a transaction hash. This hash proves that the repporter smart contract has signed a message that maps the two identities. The mapping mechanism relies on an open-source frontend that can be audited and verified and standard firebase functionalities. Whilst this requires some trust, it is minimised through open-sourcing and a frontend-heavy implementation. The trust that is needed is that the Repporter backend correctly verifies the OAuth token. 

# Use Cases

As an end-user, you can provide a simple receipt that proves that you control a specific web2 handle. More importantly, other projects can easily ask users to verify that they control a handle in order to verify their web2 identity. The use cases for businesses are vast: from airdrop management to multi-factor authentication for large payments.

# Future Improvements

[] Verifiable compute of signature
[] Attesting as Ethereum Attestation Service
[] Additional web2 identities supported
[] Additional networks supported

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

# Smart Contracts

https://github.com/OrestTa/repporter/tree/main/contract

## Deployments (v1, single-owner)

Owner pubkey: `0x5D369Fc897E83f35fe850c62772BAA0f108e45c4`

### Celo
- https://alfajores.celoscan.io/tx/0x671def353bc75ce45d30f8c66c541343056118ef0be949eacb7980a801136c27
  - https://alfajores.celoscan.io/address/0xa7c500c7ca2ce563298b1ef5ea7577434f4fd8dc#readContract
- https://explorer.celo.org/alfajores/tx/0x671def353bc75ce45d30f8c66c541343056118ef0be949eacb7980a801136c27

### Mantle
- https://explorer.testnet.mantle.xyz/tx/0x50007e7223816e2f03de18501f8980be2d1f6a81c36fd98e4866a4d974a5e0c5
  - https://explorer.testnet.mantle.xyz/address/0x37da01940581F68053eA05bb1B61DE2c48d82128/contracts?contract-tab=read-contract#address-tabs
- https://testnet.mantlescan.org/tx/0x50007e7223816e2f03de18501f8980be2d1f6a81c36fd98e4866a4d974a5e0c5 (no contract verification support)
