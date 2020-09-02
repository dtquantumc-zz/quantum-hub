// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import 'katex/dist/katex.min.css'
import './typo.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function TSPreadMoreDescriptionText () {
  // var BlockMath = ReactKatex.BlockMath
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This model is a graphical representation of the Ising Model of a <b>single</b> qubit
        and the annealing process as used in Dwave's quantum annealer.
        This tool is best used alongside a session teaching about the quantum annealer.
        For a more in-depth explanation, visit D-wave's page:
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <Link href='https://docs.dwavesys.com/docs/latest/c_gs_2.html' style={{ color: '#1599bf' }}>What is Quantum Annealing?</Link>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Controls</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        The weight slider and H-value setter are connected. The lower the H-value,
        the more bias the system has towards the state <b>1</b>.
        If the H-value is positive, the system has negative bias towards the <b>1</b> state,
        so it has bias towards the <b>0</b> state.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        The annealing time describes the amount of time that the annealing process might take.
        Of course, it's not the exact time the visual animation will take!
        The longer the annealing process, the more likely that you will get the right answer.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        Choose a weight and annealing time, then click <b>"Simulate"</b>.
        You'll get an animation and a result of the process.
        According to the settings used, you're more or less likely to get a <b>0</b> or <b>1</b>.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        Afterwards, you can manually slide the time slider around to check out the intermediate
        states.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Quantum Annealing</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        The annealing process is done by applying two Hamiltonians
        (mathematical description of problem weights)
        with changing strengths over time.
        The Hamiltonian <b>A</b> puts all the qubits in superposition of <b>0</b> and <b>1</b>.
        The Hamiltonian <b>B</b> encodes the problem we want to solve. Check out the Math
        section below for more info on how this is done.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        First, <b>A</b> is applied at full strength, and is slowly eased out as <b>B</b> is
        applied.
        Due to a quantum mechanical concept,
        the <Link href='https://en.wikipedia.org/wiki/Adiabatic_theorem' style={{ color: '#1599bf' }}>Adiabatic Theorem</Link>,
        when this process is done slowly enough, the system will stay in the lowest energy state.
      </Typography>
      <div>
        <img src={require('../../images/anneal_schedule.png')} />
      </div>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Math</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        The Ising model is actually a mathematical model describing an energy landscape.
        The energy is determined by a state <b>s</b>, and each qubit is represented by a variable.
        In a state <b>s</b>, there are N variables, <InlineMath math='s_1, s_2, \dots, s_N' />.
        Each variable has a weight (H-val) <InlineMath math='h_i' />.
        Each pair of variables has a coupling weight <InlineMath math='J_{i,j}' />.
      </Typography>
      <BlockMath math='E_{ising}(\textbf{s}) = \sum_{i=1}^N h_i s_i + \sum_{i=1}^N \sum_{j=i+1}^N J_{i,j} s_i s_j' />
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>QUBO vs Ising</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        There are two functionally equivalent models based on this equation:
        <ul>
          <li><b>QUBO:</b> Quadratic Unconstrained Binary Optimization
            <ul>
              <li>Each variable is either <b>0</b> or <b>1</b>.</li>
            </ul>
          </li>
          <li><b>Ising:</b>
            <ul>
              <li>Each variable is either <b>-1</b> or <b>1</b>.</li>
            </ul>
          </li>
        </ul>
      </Typography>
    </>
  )
}
