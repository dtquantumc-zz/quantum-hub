// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
// import { List, ListItemText } from '@material-ui/core'

export default function LatticeReadMoreDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph>
        <b>Objective</b>
      </Typography>
      <Typography align='left' paragraph>
        The objective of the game is to minimize the number of conflicts between neighbouring
        cells. Two cells are in conflict if their colour is the same. You can tell if
        a conflict arises, because a thick line will appear to connect the two
        centers of the cells.
      </Typography>
      <Typography align='left' paragraph>
        <b>Instructions</b>
      </Typography>
      <Typography align='left' paragraph>
        <ol>
          <li>
            Design your grid: Click on the hexagons to turn them on or off
            <br />
            You can also use the "Random Grid" button
          </li>
          <li>Lock your grid: Click the "Lock Grid" button</li>
          <li>Click the hexagons to change the colour of the nodes.</li>
          <li>Try to get the lowest score you can!</li>
          <li>Click "Get Quantum Solution" to send the problem to a quantum computer</li>
        </ol>
      </Typography>
      <Typography align='left' paragraph>
        <b>Quantum Randomness</b>
      </Typography>
      <Typography align='left' paragraph>
        Make a full grid, and try getting the quantum solution a couple of times.
        The solution was probably different each time!
      </Typography>
      <Typography align='left' paragraph>
        This is one of the cool things about quantum computing, it's random!
        Whenever there are many optimal solutions, the quantum computer will
        find one of them at random.
      </Typography>
      <Typography align='left' paragraph>
        <b>Problem Background</b>
      </Typography>
      <Typography align='left' paragraph>
        In condensed matter physics, this problem occurs in the context of finding
        the ground state of the antiferromagnetic Ising model on a triangular lattice.
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
        speed up finding the optimum solution. It's not known exactly when
        this strategy offers an advantage compared to non-quantum methods,
        but we're continuing to explore!
      </Typography>
    </>
  )
}
