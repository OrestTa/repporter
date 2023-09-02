#!/bin/bash

# Set the API endpoint base URL (adjust as needed)
API_BASE="http://localhost:5000"

echo "===================================="
echo "API CALLS EXAMPLE"
echo "===================================="

# Example user details
ADDRESS="0x71C9E62FA7293D43765692A408483B2fC7c7f0C6"
SIGNATURE="yourSignatureForOAuth2Token"
OAUTH2_TOKEN="yourOAuth2Token"
LINK_TYPE="twitter"
LINK_VALUE="vbuterin"

# Add Link API Call
echo "Adding a link..."
curl -X POST $API_BASE/api/addlink \
    -H "Content-Type: application/json" \
    -d '{
        "address": "'$ADDRESS'",
        "signature": "'$SIGNATURE'",
        "oauth2Token": "'$OAUTH2_TOKEN'",
        "linkType": "'$LINK_TYPE'",
        "linkValue": "'$LINK_VALUE'"
    }'
echo


# Get Link API Call
echo "Fetching a link..."
# Let's say we want to retrieve a link of type 'twitter' for the user
LINK_TYPE="twitter"
curl -X GET "$API_BASE/api/getlink?address=$ADDRESS&linkType=$LINK_TYPE"
echo

echo "===================================="
echo "End of API Calls"
echo "===================================="
