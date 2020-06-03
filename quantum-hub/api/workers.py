# SPDX-License-Identifier: MIT
#
# (C) Copyright 2020
# Diversifying Talent in Quantum Computing, Geering Up, UBC

import time

def foo(n, p):
    print('start')
    for i in range(n):
        print(i)
        time.sleep(1)
    print('done')
    return {'n':p}
