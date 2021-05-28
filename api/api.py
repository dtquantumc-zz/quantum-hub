# SPDX-License-Identifier: MIT
#
# (C) Copyright 2020
# Diversifying Talent in Quantum Computing, Geering Up, UBC

import time
from flask import Flask, render_template, request, json
import os
from redis import Redis
import redis
import rq

# D-Wave Imports
from dwave.cloud import Client
from dwave.system import DWaveSampler
from dwave.cloud import exceptions

# D-Wave Code Example Imports
from nurse_scheduling_master import nurse_scheduling
from sudoku_master import sudoku
from two_colour_master import two_colour
from TSP import TravelingSalesPerson
# Worker Code Imports
# import workers

def create_app():
    app = Flask(__name__, static_folder='./build', static_url_path='/')
    app.redis = Redis.from_url(os.environ.get('REDIS_URL') or 'redis://')
    app.task_queue = rq.Queue('qpu_tasks', connection = app.redis)
    app.is_live = True
    return app

app = create_app()

# The front-end LongRequest connects here to request a Dwave solve, or
# any other kind of time/resource-intensive process.
# If in development, the process is run locally.
# If in deployment mode (Gunicorn), the process is sent to the Redis server,
# which redistributes to an rq worker.
#
# To add a new app, add a line in the 3 marked locations:
@app.route('/make_worker', methods=['POST'])
def make_worker():

    raw_data = request.get_json()

    token = None

    try:
        token_file = open('token.txt', 'r')
        tk1 = token_file.readline().rstrip()
        tk2 = token_file.readline().rstrip()

        if app.is_live:
            token = tk1
        else:
            token = tk2
            
    except:
        print("Please define a file called token.txt in the api folder.")
        print("The first line should be the deployment token")
        print("The second line should be the testing token")
        return {'err': 'Token file not defined'}

    args = []
    if raw_data['typeOfProblem'] == 'nurseScheduling':
        args = [token, raw_data['n_nurses'], raw_data['n_days'], raw_data['nurses_per_day']]
    elif raw_data['typeOfProblem'] == 'sudokuSolving':
        args = [raw_data['sudokuArray'], token]
    elif raw_data['typeOfProblem'] == 'latticeColouring':
        args = [token, raw_data['n_vertices'], raw_data['neighbours']]
    elif raw_data['typeOfProblem'] == 'tspSolving':
        args = [raw_data['selectedEdges'], token]
    # elif raw_data['typeOfProblem'] == 'newTypeOfProblem':
    #     args = [whatever your arguments are for the called function]

    if app.is_live:
        if raw_data['typeOfProblem'] == 'nurseScheduling':
            job = app.task_queue.enqueue('nurse_scheduling_master.nurse_scheduling.main', args=args)
        elif raw_data['typeOfProblem'] == 'sudokuSolving':
            job = app.task_queue.enqueue('sudoku_master.sudoku.main', args=args)
        elif raw_data['typeOfProblem'] == 'latticeColouring':
            job = app.task_queue.enqueue('two_colour_master.two_colour.main', args=args)
        elif raw_data['typeOfProblem'] == 'tspSolving':
            job = app.task_queue.enqueue('TSP.TravelingSalesPerson.main', args=args)
        # elif raw_data['typeOfProblem'] == 'newTypeOfProblem':
        #     job = app.task_queue.enqueue('Location of your function', args=args)

        return {'jobStatus':'enqueued', 'jobID':job.get_id()}

    else:
        if raw_data['typeOfProblem'] == 'nurseScheduling':
            res = nurse_scheduling.main(*args)
        elif raw_data['typeOfProblem'] == 'sudokuSolving':
            res = sudoku.main(*args)
        elif raw_data['typeOfProblem'] == 'latticeColouring':
            res = two_colour.main(*args)
        elif raw_data['typeOfProblem'] == 'tspSolving':
            res = TravelingSalesPerson.main(*args)
        # elif raw_data['typeOfProblem'] == 'newTypeOfProblem':
        #     res = newProblemFunction(*args)

        res['jobStatus'] = 'finished'
        return res

# The front-end's LongRequest connects to this to query whether the calculation
# results are in yet, and the current status (in queue, in progress, finished, etc.)
@app.route('/check_worker', methods=['POST'])
def check_worker():
    # Get relevant request data
    raw_data = request.get_json()
    jobID = raw_data['jobID']

    # Fetch the job whose ID was passed.
    try:
        job = rq.job.Job.fetch(jobID, connection = app.redis)
    except redis.exceptions.ConnectionError:
        return {'error':'Invalid Job ID'}, 400
    except Exception as e:
        print(e)
        return {'error':'Uncaught'}, 400

    # Prepare result for output
    if job.get_status() != 'finished':
        res = {}
        res['meta'] = job.meta
    else:
        res = job.result
    res['jobStatus'] = job.get_status()
    res['jobID'] = job.get_id()
    return res

# Routes the most basic website connection
@app.route('/')
def my_index():
    return app.send_static_file('index.html')

# This routes all website connections, sending them to the compiled React webpage
@app.route('/app/')
@app.route('/app/<string:game>')
def app_page(game):
	print(game)
	return app.send_static_file("index.html")

# This was for testing purposes, to mirror the request's token back at the sender
@app.route('/api_token', methods=['GET', 'POST'])
def set_api_token():
    return {'given_token': request.get_json()['token']}

# For the Console in-app, just gets IP of sender :P
@app.route('/get_ip', methods=['GET'])
def get_ip():
    print(request.remote_addr)
    return {'ip': request.remote_addr}

# Load and return the complete TSP graph
@app.route('/get_persistent_graph', methods=['GET'])
def get_graph():
    print("wants routes")
    # print( app.send_static_file("../TSP/Persistent_Routes.json") )
    # return app.send_static_file("../TSP/Persistent_Routes.json")
    with app.open_resource('TSP/Persistent_Routes.json') as f:
        return json.load(f)

if __name__ == '__main__':
    # Run Flask App
    port = int(os.getenv('PORT', 5000))
    print(port)
    app.is_live = False
    app.run(debug=True, host='0.0.0.0', port=port)
