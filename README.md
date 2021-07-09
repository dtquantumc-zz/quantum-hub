SPDX-License-Identifier: MIT or Apache-2.0

Repo Information:
=================

Licencing Information:
----------------------
- All new code created for this project should be licensed under the MIT license
- Some existing Dwave code is used and licensed under Apache-2.0
- Unless otherwise stated, code in this repository is licensed under the MIT license

Authors:
--------
Listed alphabetically, the authors wishing to be credited are:
- Haris Amiri
- Ari Blondal (ari.blondal@gmail.com)
- Tanraj Saran (tsaran70@gmail.com)
- Andrea Tang (andreamtang@gmail.com)

Project Information:
====================

Quantum Hub
-----------
The [Quantum Hub](http://quantum-hub-dev.us-west-2.elasticbeanstalk.com/) is a website with a backend connecting to D-wave's Quantum Annealer.
It will be used for educational purposes as well as Geering Up workshops and camps.

DTQC
----
DTQC, The Diversifying Talent in Quantum Computing initiative aims to bring quantum
computing themed workshops, local events, summer camps, and public outreach to youth
in the K-12 grade range.
Through hands-on activities, interactive software tools,
and implementing best practices in curriculum development,
this initiative aims to break down barriers of entry and empower young people who are
interested in STEM, in exploring a future in quantum computing.
There is a particular focus on reaching young women, Indigenous youth,
and other underrepresented groups.
With academic (SFU, UVic, UBC Geering Up Engineering Outreach) and industry partners
(D-Wave Systems, Microsoft), as well as co-investment from the Canadian Digital Technology
Supercluster, this project is developing an open-source quantum computing education
resource hub, consisting of curriculum tools, web applications, quantum computing games,
and various curriculum materials.

Partners
--------
Thank you to our project partners:
- UBC Geering Up
- Canadian Digital Technology Supercluster
- D-Wave Systems
- Microsoft
- The University of British Columbia 

How To Install / Develop:
=========================

Quantum Hub is a hybrid React / Flask system, using JS React for the front-end, with a flask back-end.

This section will be set up into several subsections:
- Architecture
- How to install the tools for development
- Development tools and environment
- How to start a widget on Q-Hub
- Tools for running deployment version locally
- How to deploy to Heroku (for reference when moving to AWS)

Architecture and project setup
------------------------------
The Quantum Hub Github is split into three main sections, one being a subsection.

First, there’s the documentation, found under ```sphinx/```. When compiled and satisfactory, the built documentation website is moved to docs/, where Github Pages reads from for the online version of the documentation.

Second, we have the NodeJS React front-end. This is contained within the folder ```quantum_hub/```. All the source code for all the widgets is contained within the ```quantum_hub/src/``` folder.

Finally, the Python Flask project is located within ```quantum_hub/api/```. This folder is the only part that gets uploaded to Heroku when deploying. To this effect, the React app must be built and moved into this folder before deployment.

Dev tools and installing them
------------------------------

The project requires:
- NodeJS https://nodejs.org/en/
- Yarn https://classic.yarnpkg.com/en/docs/install
- Python 3

NodeJS and Yarn have good installation instructions on their websites.
For Python, it is recommended to use venv or instal virtualenv, and make a new virtual environment: https://docs.python.org/3/library/venv.html


Install Python Dependancies:

Make a new virtual environment, set a macro to activate it in your bashrc, and then install the required packages:
> ```pip install -r quantum-hub/api/requirements.txt```

Install NodeJS packages:

In the quantum-hub folder within the repo, run:

> ```yarn```

It should install all packages for you.

Now you’re set for development!

Running Development servers:
-------------------------------

Running the development server is really easy:
First start the backend:
> ```yarn start-api```

To start the react app, just call:
> ```yarn start```

NPM should open up a tab of your favourite web browser to see the webpage as you’re developing. If it doesn’t, try:

https://localhost:3000/

Now go ahead and develop. Both servers should hot-refresh when files are saved, so you’re set!

Starting a sample Q-Hub widget
---------------------------------

Quantum Hub has a lot of tools already built to support easy addition of new widgets.
1. In ```quantum-hub/src/components/Widget``` you will find the front-end code for all widgets.
Make a new folder for your widget, and copy over ```EmptyWidget.js``` from the 
```EmptyWidget``` folder.

2. Rename it to whatever you want, and modify the code however you want. Just make sure that it exports a React Component.
Then, go to Typography, and copy a pair of typographies from existing widgets. Change the text around to describe your widget properly!

3. Now go to ```Widget/widgetList.js```. Import your Widget, and your two text modules for the description panel. Then, add an entry to widgetList for your widget.
The keys are:
    - enabler: currently not in use, but you can use it to identify the widget
    - route: this is the route that will show your widget.
Please start it with ```/app/``` unless you want to dive into ```api.py`` and change up routing behaviour on the backend.
    - name: Another identifier for the widget
    - title: This is the string that will appear at the top of the Info Box on the right of the webpage
    - briefDescriptionText: This is the React component corresponds to the text showing in the unexpanded info box
    - readMoreDecriptionText: Shows up after clicking “read more” in the info box.
    - brand: The string at the top of the webpage, and also the one in the widget drop-down menu
    - visible: Boolean, whether or not the widget should be visible in the menu.
        - If false, the widget is still accessible by a direct link
    - component: This is the identifier of the Widget’s React Component.
        - See: https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime

Your widget should now be on the development website!
If you want it to be able to communicate with the backend and do all those fun async network calls, I’ve built a handy tool called ```LongRequest```. Check out an example of how to use it in ```Widget/Sudoku/sudokuSolveRequest```,
and the implementation in ```Widget/LongRequest.js```.

Backend: If you want to make a backend manager for your widget:
1. First make a python program that runs whatever code you want done. I would recommend modeling it off of ```api/two_colour_master/two_colour.py``` for the simplest example.

    - IMPORTANT: Your function must return a dictionary, and the keys ‘jobStatus’ and ‘jobID’ are reserved. If your function encounters an error, please return a dictionary with the key ‘error’ with value describing the error. This should make its way to the front-end for easier diagnostics.

2. Then, when hooking it up to the flask/gunicorn backend, note that you’ll need to insert three lines in the make_worker() function in api/api.py. First, define the arguments you want to call the program with:

3. If the app is live (running through gunicorn and not flask), you’ll have to enqueue and create a python RQ worker. Check out Python RQ in the next section for reference.

4. Finally, if the app is not live, the problem should be run anyways:

Now, all that’s left is to test :D

Install deployment tools
------------------------

The tools used for running the production server are:
- Redis https://redis.io/
- Python RQ https://python-rq.org/
- Gunicorn https://gunicorn.org/
- Python RQ and Redis are used to allow the enqueueing of expensive processes to a processing queue.
    - This, along with LongRequest, allow for easy management of expensive or long Python processes, as Dwave problem-solving usually amounts to.

Python RQ and Gunicorn should already have been installed in the requirements.txt section, so now just follow the steps on https://redis.io/topics/quickstart to get redis-server installed.
Compile and run a deployment version locally

Once everything is installed, first build the React package. In quantum-hub/, run:
> ```yarn build```

Then, once that has built, be ready to have 3 terminals / command prompts open.

For Redis server, run:
> ```redis-server```


For Python RQ, run:
> ```cd api```

> ```rq worker qpu_tasks```

For Gunicorn, run:
> ```cd api```

> ```gunicorn api:app```

Finally, Gunicorn should tell you what port the server has opened on. Usually it is 8000, so go to:
https://localhost:8000

Deploy to Heroku and Heroku Configuration
-----------------------------------------

I personally use Heroku CLI to deploy to Heroku. One could use a git hook, but that’s inconvenient since we upload a git subtree rather than the whole repo.


First download the Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

Then, make sure you have access to a Heroku account that’s connected to the quantum-hub Heroku project.

> ```heroku login```

> ```git subtree push --prefix quantum-hub/api heroku master```

This will push the ```api/``` folder to heroku, which will automatically deploy.

The heroku app uses one add-on and two free dynos.
The add-on, Heroku Redis is used to handle the Redis server for queueing up jobs.
The first dyno is a web dyno, and it runs gunicorn as the backend.
The second dyno uses the simple UNIX trick of & at the end of a command to run two copies of rq worker at once.
They haven’t gotten overwhelmed yet, and having two drastically reduces the length of the solving queue.

Check ```api/Procfile``` For exact commands
