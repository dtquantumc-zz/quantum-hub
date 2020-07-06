Sudoku Solver
==========================

This sudoku solver uses Dwave's Leap system to solve
sudokus. It also contains a pretty cool validation
and error-showing system, indicated by highlighted
rows, columns, and blocks where there are errors.

Front-end components
--------------------

.. js:autofunction:: SudokuGame

	.. js:autofunction:: GridSquare
	
	.. js:autofunction:: makeSudokuGrid	

	.. js:autofunction:: handleKeyPress

	.. js:autofunction:: sudokuSolveRequest

	.. js:autofunction:: sudokuSolveRequest.postSolve

	.. js:autoclass:: SudokuVariables
		:members:
	
	.. js:autofunction:: resetSudokuGrid	

Backend code
------------

.. automodule:: sudoku_master.sudoku
	:members: