Nurse Scheduler
=========================

This Nurse Scheduler Schedules nurses. If
given a number of nurses and a number of days,
it will attempt to make a schedule such that
there is a nurse working every day, no nurse
works two days in a row (wouldn't that be a
great world, never work two days in a row),
and nurses' workload is evenly split up.

Front-end components
--------------------

.. js:autofunction:: NurseScheduler

	.. js:autofunction:: NurseSquare

	.. js:autofunction:: DrawNurses

	.. js:autofunction:: nurseSolveRequest

	.. js:autofunction:: nurseSolveRequest.postSolve

	.. js:autoclass:: NurseVariables
		:members:

Backend code
------------

.. automodule:: nurse_scheduling_master.nurse_scheduling
	:members: