// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function TSPbriefDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            This is a graphical representation of the Ising Model of a qubit and the annealing
            process as used in Dwave's quantum annealer.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            The qubit is initially in an equal superposition of states <b>1</b> and <b>0</b>.
            Then, a "hamiltonian" is slowly applied, changing the energy of the states.
            This is annealing.
            Finally, the system resolves. As in nature, it prefers low-energy states.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            A smaller H-Value means a lower energy for the <b>1</b> state, and the opposite is true
            for a higher H-Value.
      </Typography>
    </>
  )
}
