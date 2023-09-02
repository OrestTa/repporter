# Repporter backend. Main functionality:
# 1. receive link Request from frontend.
#   - verify oauth token
#   - verify address signature
#   - writes to smart contract
#   - returns transaction hash
# 2. Bonus: API to read from smart contract


from flask import Flask, request, jsonify
from crypto import (
    recover_address,
    verify_oauth2,
    verify_signature,
    addLinkForUser,
    getLinkForUser,
    getAllLinksForUser,
)

app = Flask(__name__)


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


if __name__ == "__main__":
    app.run(debug=True)
