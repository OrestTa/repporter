# Repporter backend. Main functionality:
# 1. receive link Request from frontend.
#   - verify oauth token
#   - verify address signature
#   - writes to smart contract
#   - returns transaction hash
# 2. Bonus: API to read from smart contract


from flask import Flask, request, jsonify
from crypto import recover_address, verify_oauth2, verify_signature, addLinkForUser, getLinkForUser, getLinksForUser

app = Flask(__name__)


@app.route('/api/addlink', methods=['POST'])
def add_link():
    data = request.get_json()
    address = data.get('address')
    signature = data.get('signature')
    oauth2_token = data.get('oauth2_token')

    if not verify_signature(address, signature, oauth2_token):
        return jsonify({'error': 'Signature verification failed'}), 400

    if not verify_oauth2(oauth2_token):
        return jsonify({'error': 'OAuth2 verification failed'}), 400
    
    tx_receipt = addLinkForUser(address, oauth2_token)

    if tx_receipt['status'] == 1:
        return jsonify({'message': 'Successfully added link', 'tx_hash':  tx_receipt['tx_hash']}), 200
    else:
        return jsonify({'error': 'Smart contract interaction failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)
