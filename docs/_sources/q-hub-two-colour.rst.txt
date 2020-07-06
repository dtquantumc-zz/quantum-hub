Two-Colouring on a Lattice
==========================

This is a two-colouring optimization problem on a triangular
(hexagonal) lattice. It uses Dwave's quantum annealer, and
is a pretty nice simplification of the exact kinds of problems
that Dwave's annealer is good at.

Front-end components
--------------------

.. js:autofunction:: LatticeColourer

	.. js:autofunction:: HexGrid

	.. js:autoclass:: LatticeVars
		:members:

Backend code
------------

.. automodule:: two_colour_master.two_colour
	:members: