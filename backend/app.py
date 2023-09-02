# Repporter backend. Main functionality:
# 1. receive link Request from frontend.
#   - verify oauth token
#   - verify address signature
#   - writes to smart contract
#   - returns transaction hash
# 2. Bonus: API to read from smart contract


from flask import Flask, request, jsonify
from flask_cors import CORS
from crypto import (
    recover_address,
    verify_oauth2,
    verify_signature,
    addLinkForUser,
    getLinkForUser,
    getAllLinksForUser,
)

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://repporter.onrender.com", "https://repporter-uij0.onrender.com/"]}})


@app.route("/api/addlink", methods=["POST"])
def add_link():
    data = request.get_json()
    address = data.get("address")
    signature = data.get("signature")
    link_type = data.get("linkType")
    link_value = data.get("linkValue")
    oauth2_token = data.get("oauth2Token")

    # assert all required fields are present
    if not address or not signature or not link_type or not link_value or not oauth2_token:
        return (
            jsonify(
                {
                    "error": "address, signature, linkType, linkValue, and oauth2_token are required"
                }
            ),
            400,
        )

    if not verify_signature(address, signature, oauth2_token):
        return jsonify({"error": "Signature verification failed"}), 400

    if not verify_oauth2(oauth2_token):
        return jsonify({"error": "OAuth2 verification failed"}), 400

    link_value = data.get("linkValue")

    result = addLinkForUser(address, link_type, link_value)

    return jsonify({"results": result}), 200

@app.route("/api/getlink", methods=["GET"])
def get_link():
    user_address = request.args.get("address")
    link_type = request.args.get("linkType")

    if not user_address or not link_type:
        return jsonify({"error": "Both address and linkType are required"}), 400

    try:
        link = getLinkForUser(user_address, link_type)
        return jsonify({"link": link}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/")
def index():
    return """
    <h1>Repporter Backend v0.4</h1>
    <p>Example usage:</p>
    <pre>
    #!/bin/bash

    # Set the API endpoint base URL (adjust as needed)
    # API_BASE="http://localhost:5000"
    API_BASE="https://repporter-uij0.onrender.com/"
    

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
    curl -X POST $API_BASE/api/addlink \\
        -H "Content-Type: application/json" \\
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
    """


if __name__ == "__main__":
    app.run(debug=True)
