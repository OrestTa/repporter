# Repporter backend. Main functionality:
1. receive link Request from frontend.
  - verify oauth token
  - verify address signature
  - writes to smart contract
  - returns transaction hash
2. Bonus: API to read from smart contract



## Usage
- install python (and make venv if you want)
- `pip install -r requirements.txt`
- `python app.py`


Testing:
`python -m unittest test.py`