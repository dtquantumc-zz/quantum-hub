// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const sudokuStyle = theme => ({
    sudokuInput: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
          margin: theme.spacing(1)
        }
      }
})

export default sudokuStyle