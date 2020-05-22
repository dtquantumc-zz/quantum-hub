Deployment to Heroku
====================

At the moment (May 2020), the Quantum Hub is hosted
on Heroku, using Flask. This means that the React
App must be compiled and built before it can run.

The Flask app will have two uses:
- Serve the React app to users through index.html
- Respond to Solve calls by invoking dimod or D-Wave's QPU

In order to make this run both on deployment and
development, the responding to server calls should
work normally because of the port 5000 proxy in
package.json. In dev, simply connect to the React
app opened automatically by "yarn start". To run the
Flask backend, use "yarn start-api".

To build for Heroku, call "yarn build". This will
build the React app using "react-scripts build", and
then move the build folder to quantum-hub/api. Then,
we deploy that exact folder. We will use the new(ish)
Git Subtree command to do so.

Keep in mind this is based around a Unix-based Command
Line, modify to the best of your own knowledge for
Command Prompt (And write a tutorial here!)

First, install Heroku Command Line Tools.
Then, login:

.. code-block:: Bash

	heroku login

Go to the project root directory:

.. code-block:: Bash

	cd sw

Add a remote Heroku

.. code-block:: Bash

	heroku git:remote -a quantum-hub

From the project root directory, push the api subtree

.. code-block:: Bash

	git subtree push --prefix quantum-hub/api heroku master


Congratulations, this should have worked!
