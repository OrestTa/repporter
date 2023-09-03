import os
from dotenv import load_dotenv
from eth_account.messages import encode_defunct
from eth_account import Account
from web3 import Web3
from config import ABI, DEPLOYMENTS, CHAIN_RPCS, GAS_PRICE, EXPLORERS

load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# TODO: choose provider
w3 = Web3()  # Goerli testnet
account = Account.from_key(PRIVATE_KEY)
sender_address = account.address


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
    return True
    # # TODO: ensure compatible with frontend
    recovered_address = recover_address(message, signature)
    return address.lower() == recovered_address.lower()
    # recovered_address = w3.eth.account.recover_message(
    #     Web3.toText(hexstr=message), signature=signature)
    # return recovered_address == address


def verify_oauth2(token: str) -> bool:
    return True  # TODO: Replace with actual oauth2 verification logic


# addLinkForUser, getLinkForUser, getLinksForUser
def addLinkForUser(address: str, link_type: str, link_value: str) -> dict:
    results = {}

    for chain_id, contract_addr in DEPLOYMENTS.items():
        try:
            # Set the provider for the current chain
            rpc_url = CHAIN_RPCS[chain_id]
            print(rpc_url)
            current_w3 = Web3(Web3.HTTPProvider(rpc_url))

            # Check if the connection is successful
            print(current_w3.is_connected())
            if not current_w3.is_connected():
                results[chain_id] = "Failed to connect to RPC"
                continue

            # Set up the contract for the current chain
            current_contract = current_w3.eth.contract(
                address=contract_addr, abi=contract_abi
            )

            # Sign and send the transaction
            print([address, link_type, link_value])
            tx_data = current_contract.encodeABI(
                fn_name="addLinkForUser", args=[address, link_type, link_value]
            )
            tx_params = {
                "from": sender_address,
                "gas": 2000000,  # Adjust gas as needed
                "gasPrice": current_w3.to_wei(GAS_PRICE[chain_id], "wei"),
                "nonce": current_w3.eth.get_transaction_count(sender_address),
                "data": tx_data,
                "to": contract_addr,
            }

            signed_tx = account.sign_transaction(tx_params)
            tx_hash = current_w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            tx_receipt = current_w3.eth.wait_for_transaction_receipt(tx_hash)

            results[chain_id] = {
                "status": tx_receipt["status"],
                "tx_hash": tx_hash.hex(),
                "tx_link": EXPLORERS[chain_id] + "tx/" + tx_hash.hex(),
            }

        except Exception as e:
            results[chain_id] = str(e)

    return results


def getLinkForUser(user_address: str, link_type: str) -> dict:
    results = {}

    for chain_id, contract_addr in DEPLOYMENTS.items():
        try:
            # Set the provider for the current chain
            rpc_url = CHAIN_RPCS[chain_id]
            current_w3 = Web3(Web3.HTTPProvider(rpc_url))

            # Check if the connection is successful
            if not current_w3.is_connected():
                results[chain_id] = "Failed to connect to RPC"
                continue

            # Set up the contract for the current chain
            current_contract = current_w3.eth.contract(
                address=contract_addr, abi=contract_abi
            )

            # Call the getLinkForUser function
            link_value = current_contract.functions.getLinkForUser(
                user_address, link_type
            ).call()
            results[chain_id] = link_value

        except Exception as e:
            results[chain_id] = str(e)

    return results


def getAllLinksForUser(user_address: str) -> dict:
    results = {}

    all_link_types = ["twitter", "type2", "type3", "type4", "type5"]

    for link_type in all_link_types:
        link_data = getLinkForUser(user_address, link_type)
        results[link_type] = link_data

    return results
