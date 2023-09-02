curl -X POST http://localhost:5000/api/addlink -H "Content-Type: application/json" -d '{
    "address": "0xYourEthereumAddressHere",
    "signature": "0xYourSignatureHere",
    "oauth2_token": "YourOAuth2TokenHere"
}'

