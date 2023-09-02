from web3 import Web3

w3 = Web3(Web3.HTTPProvider("https://eth-goerli.public.blastapi.io"))  # Goerli testnet


# def ecrecover(message: str, signature: str) -> str:
#     """
#     Recovers the Ethereum address that was used to sign the given message.

#     :param message: The message that was signed.
#     :param signature: The signature in question.
#     :return: The address that signed the message.
#     """
#     # Recover the address
#     # Prepare the Ethereum specific prefix and hash the message with it
#     prefixed_message = f"\x19Ethereum Signed Message:\n{len(message)}{message}"
#     message_hash = w3.keccak(text=prefixed_message)

#     # Create a signable message with the required format
#     signable_message = {
#         "version": "E",
#         "header": "thereum Signed Message:\n32",
#         "body": message_hash
#     }

#     # Recover the address
#     return w3.eth.account.recover_message(signable_message=signable_message, signature=signature)


def ecrecover(message: str, signature: str) -> str:
    """
    Recovers the Ethereum address that was used to sign the given message.

    :param message: The message that was signed.
    :param signature: The signature in question.
    :return: The address that signed the message.
    """
    # Convert message to bytes
    message_bytes = bytes(message, "utf-8")

    # Obtain the Ethereum-specific signature hash of the message
    message_hash = Web3.solidity_keccak(
        ["string", "bytes32"],
        ["\x19Ethereum Signed Message:\n32", Web3.keccak(text=message)],
    )

    # Recover the address
    # return w3.eth.account.recover_hash(message_hash, signature=signature)

    return w3.eth.account._recover_hash(message_hash, signature=signature)


message = "I♥SF"
signature = "0xe6ca9bba58c88611fad66a6ce8f996908195593807c4b38bd528d2cff09d4eb33e5bfbbf4d3e39b1a2fd816a7680c19ebebaf3a141b239934ad43cb33fcec8ce1c"  # The signature should be 65 bytes long (r, s, v)

address = ecrecover(message, signature)
print(address)
assert address == "0x5ce9454909639D2D17A3F753ce7d93fa0b9aB12E"
print("Success!")
