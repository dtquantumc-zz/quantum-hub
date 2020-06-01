# SPDX-License-Identifier: MIT
#
# (C) Copyright 2020
# Diversifying Talent in Quantum Computing, Geering Up, UBC

import time
from flask import Flask, render_template, request
import os

# D-Wave Imports
from dwave.cloud import Client
from dwave.system import DWaveSampler
from dwave.cloud import exceptions

# D-Wave Code Example Imports
from nurse_scheduling_master import nurse_scheduling
from sudoku_master import sudoku

app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route('/qpu_request', methods=['POST'])
def test_server():
    raw_data = request.get_json()

    # results = {'test': 'complete', 'token': raw_data['token']}
    if request.method == 'POST':
        endpoint = 'https://cloud.dwavesys.com/sapi/'
        # token = raw_data['token']
        token = 'DEV-a141649cf7a24ed2fd84b5939533c9fcc2d99fb6' # Haris
        # token = 'DEV-98f37d3736d62d7061eaa5e68214a92eadb2393b' # Ari
        client = 'qpu'
        solver = 'DW_2000Q_6'
        try:
            sampler = DWaveSampler(client=client,
                                   endpoint=endpoint,
                                   token=token,
                                   solver=solver)
        except ValueError:
            return {'error':'Missing Token!'}, 400
        except exceptions.SolverAuthenticationError:
            return {'error':'Token Authentication Failed!'}, 400
        except Exception as e:
            return {'error':'Unexpected Error: ' + str(e)}, 400

        if raw_data['typeOfProblem'] == 'nurseScheduling':
            results = nurse_scheduling.main(token=token,
                                            qpu_sampler=sampler,
                                            n_nurses=int(raw_data["n_nurses"]),
                                            n_days=int(raw_data["n_days"]))
            # print(results)
        elif raw_data['typeOfProblem'] == 'sudokuSolving':
            results = sudoku.main(qpu_sampler=sampler,
                                  matrix=raw_data['sudokuArray'],
                                  token=token)
        else: return {'error':'Invalid typeOfProblem'}, 400

    return results

@app.route('/')
def my_index():
    return app.send_static_file('index.html')


@app.route('/app/')
@app.route('/app/<string:game>')
def app_page(game):
	print(game)
	return app.send_static_file("index.html")

if __name__ == '__main__':
    # Run Flask App
    port = int(os.getenv('PORT', 5000))
    print(port)
    app.run(debug=True, host='0.0.0.0', port=port)


@app.route('/api_token', methods=['GET', 'POST'])
def set_api_token():
    return {'given_token': request.get_json()['token']}

@app.route('/get_ip', methods=['GET'])
def get_ip():
		return {'ip': request.remote_addr}