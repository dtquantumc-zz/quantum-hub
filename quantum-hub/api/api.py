import time
from flask import Flask, render_template
import sys, os

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/test_server')
def test_server():
	return {'test': 'complete'}

@app.route('/')
def my_index():
	return app.send_static_file("index.html")

if __name__ == '__main__':
	# Run Flask App
	port = int(os.getenv("PORT",5000))
	print (port)
	app.run(debug=True, port=port)