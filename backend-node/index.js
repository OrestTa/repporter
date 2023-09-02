const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');

const app = express();

// Middlewares
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Assuming you have a local Ethereum node running on HTTP port 8545
const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-goerli.public.blastapi.io'));

// TODO: Implement OAuth2 verification logic here

app.post('/verify', async (req, res) => {
    try {
        const { address, signature, message, oauth2Info } = req.body;

        // Recover the signer's address
        const recoveredAddress = web3.eth.accounts.recover(message, signature);

        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(400).json({ error: 'Signature verification failed' });
        }

        // TODO: Implement OAuth2 verification with the provided oauth2Info

        // If everything is verified, call the smart contract
        const contractAddress = "YOUR_CONTRACT_ADDRESS";
        const contractABI = []; // Your contract ABI
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // TODO: Add the necessary logic to unlock the account or use a provider that can sign transactions

        const tx = await contract.methods.addLink(address, "WEB2_ACCOUNT").send({ from: address }); // Replace "WEB2_ACCOUNT" with appropriate data

        res.json({ success: true, transactionHash: tx.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});