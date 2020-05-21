import time
from flask import Flask

app = Flask(__name__)

@app.route('/test_server')
def test_server():
	return {'test': 'complete'}
