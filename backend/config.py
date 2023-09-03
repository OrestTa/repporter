ABI = [
    {
        "constant": False,
        "inputs": [{"name": "newOwner", "type": "address"}],
        "name": "changeOwner",
        "outputs": [],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "userAddress", "type": "address"},
            {"name": "linkType", "type": "string"},
            {"name": "linkValue", "type": "string"},
        ],
        "name": "addLinkForUser",
        "outputs": [],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [
            {"name": "useraddress", "type": "address"},
            {"name": "linkType", "type": "string"},
        ],
        "name": "getLinkForUser",
        "outputs": [{"name": "", "type": "string"}],
        "payable": False,
        "stateMutability": "view",
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": False,
        "stateMutability": "view",
        "type": "function",
    },
]


DEPLOYMENTS = {
    # mantle testnet
    # 5001: "0x37da01940581F68053eA05bb1B61DE2c48d82128",
    # celo alfajores
    44787: "0xA7C500c7CA2CE563298B1EF5EA7577434f4fD8dC",
}

CHAIN_RPCS = {
    # 5001: "https://rpc.testnet.mantle.xyz",
    44787: "https://alfajores-forno.celo-testnet.org",
}
