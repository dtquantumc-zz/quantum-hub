import time
from flask import Flask, render_template, request
import sys, os

app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/test_server', methods = ['POST', 'GET'])
def test_server():
	print(request.get_json())
	return {'test': 'complete'}

@app.route('/')
def my_index():
	return app.send_static_file("index.html")

if __name__ == '__main__':
	# Run Flask App
	port = int(os.getenv("PORT",5000))
	print (port)
	app.run(debug=True, host='0.0.0.0', port=port)