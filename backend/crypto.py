import os
from dotenv import load_dotenv
from eth_account.messages import encode_defunct
from eth_account import Account
from web3 import Web3
from config import ABI, DEPLOYMENTS

load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# TODO: choose provider
w3 = Web3(Web3.HTTPProvider('https://eth-goerli.public.blastapi.io')) # Goerli testnet
account = Account.from_key(PRIVATE_KEY)
sender_address = account.address

tx_params = {
    'from': sender_address,
    'gas': 2000000,  # You might want to estimate gas
    'gasPrice': w3.toWei('20', 'gwei'),
    'nonce': w3.eth.getTransactionCount(sender_address)
}


# TODO: Set smart contract ABI and address
contract_abi = ABI
contract_address = "0x0000000000000000000000000000000000000000"
contract = w3.eth.contract(address=contract_address, abi=contract_abi)


def recover_address(message: str, signature: str) -> str:
    # message_hash = w3.eth.account.defunct_hash_message(text=message)
    # address = w3.eth.account.recoverHash(message_hash, signature=signature)
    # message_hash = Account.defunct_hash_message(text=message)
    # address = Account.recoverHash(message_hash, signature=signature)
    address = Account.recover_message(message, signature=signature)
    return address


def verify_signature(address: str, signature: str, message: str) -> bool:
    # # TODO: ensure compatible with frontend
    recovered_address = recover_address(message, signature)
    return address.lower() == recovered_address.lower()
    # recovered_address = w3.eth.account.recover_message(
    #     Web3.toText(hexstr=message), signature=signature)
    # return recovered_address == address

def verify_oauth2(token: str) -> bool:
    return True  # TODO: Replace with actual oauth2 verification logic


# addLinkForUser, getLinkForUser, getLinksForUser

def addLinkForUser(address: str, oauth2_token: str) -> str:
    # Sending transaction to the smart contract
    signed_tx = account.sign_transaction({
        'nonce': tx_params['nonce'],
        'gasPrice': w3.toWei('20', 'gwei'),
        'gas': 2000000,
        'to': contract_address,
        'value': 0,
        'data': contract.encodeABI(fn_name="addlink", args=[address, oauth2_token])
    })

    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

    return {"status": 1, "tx_hash": tx_hash.hex()}

    tx_hash = '0xbbe6116bd80bbb7ad8d89204328be0ccc08432c0c062c48559583102bc9b68bf'
    return {"status": 1, "tx_hash": tx_hash}
