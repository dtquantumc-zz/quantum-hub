// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default function LatticeReadMoreDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph>
        To use this widget, first design your grid of play by clicking on hexagonal
        cells to enable or disable them. When you are satisfied, click the "Lock Grid"
        button to lock your grid and start playing!
      </Typography>
      <Typography align='left' paragraph>
        The object of the game is to minimize the number of conflicts between neighbouring
        cells. Two cells are in conflict if their colour is the same. You can tell if
        a conflict arises, because a thick line will appear to connect the two
        centers of the cells.
      </Typography>
      <Typography align='left' paragraph>
        In condensed matter physics, this problem occurs in the context of finding
        the ground state of the antiferromagnetic Ising model on a triangular lattice.
      </Typography>
      <Typography align='left' paragraph>
        When you are satisfied with your best two-colouring configuration, you can then
        get a quantum computer's solution to the same problem. The computer runs the
        same problem 50 times, choosing the best answer. Sometimes, there are multiple
        best answers! When that happens, one is chosen at random when the quantum computer
        solves it.
      </Typography>
      <Typography align='left' paragraph>
        Try this out with a full grid! Run the quantum solver a couple of times, the
        answer will probably be different every time!
      </Typography>
      <Typography align='left' paragraph>
        This problem is an easier version of the general problem of graph two-colouring,
        which is equivalent to
        the <Link href='https://en.wikipedia.org/wiki/Maximum_cut' style={{ color: '#1599bf' }}>Maximum Cut</Link> problem,
        a problem
        in <Link href='https://en.wikipedia.org/wiki/Graph_theory' style={{ color: '#1599bf' }}>Graph Theory</Link>.
        This problem is what is
        called <Link href='https://en.wikipedia.org/wiki/NP-hardness' style={{ color: '#1599bf ' }}>NP-Hard</Link>,
        which basically means that computers take a very long time to solve large
        versions of it.
      </Typography>
      <Typography align='left' paragraph>
        This two colouring problem is a special case of the optimization problem
        implemented by D-Wave's quantum annealer. The annealer
        uses <Link href='https://en.wikipedia.org/wiki/Quantum_tunnelling' style={{ color: '#1599bf' }}>Quantum Tunnelling</Link> to
        try and speed up finding the optimum solution. It's not known exactly when
        this strategy offers an advantage compared to classical methods,
        but we're continuing to explore!
      </Typography>
    </>
  )
}
