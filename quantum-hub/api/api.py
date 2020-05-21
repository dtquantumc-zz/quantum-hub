import time
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/test_server')
def test_server():
	return {'test': 'complete'}

@app.route('/')
def my_index():
	return render_template("../build/index.html")