import unittest
from app import recover_address, verify_signature
from eth_account.messages import encode_defunct, defunct_hash_message


class TestBackendFunctions(unittest.TestCase):
    def test_recover_address(self):
        # Assuming you have a valid message, address, and signature to test.
        message = encode_defunct(text="I♥SF")
        signature = "0xe6ca9bba58c88611fad66a6ce8f996908195593807c4b38bd528d2cff09d4eb33e5bfbbf4d3e39b1a2fd816a7680c19ebebaf3a141b239934ad43cb33fcec8ce1c"
        expected_address = "0x5ce9454909639D2D17A3F753ce7d93fa0b9aB12E"

        recovered_address = recover_address(message, signature)
        self.assertEqual(recovered_address.lower(), expected_address.lower())

    def test_verify_signature(self):
        # Assuming you have a valid message, address, and signature to test.
        address = "0x5ce9454909639D2D17A3F753ce7d93fa0b9aB12E"
        message = encode_defunct(text="I♥SF")
        message = defunct_hash_message(text="I♥SF")
        # print(message)
        # print(message2)
        signature = "0xe6ca9bba58c88611fad66a6ce8f996908195593807c4b38bd528d2cff09d4eb33e5bfbbf4d3e39b1a2fd816a7680c19ebebaf3a141b239934ad43cb33fcec8ce1c"

        result = verify_signature(address, signature, message)
        self.assertTrue(result)


if __name__ == "__main__":
    unittest.main()
