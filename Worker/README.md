# Scan8 Worker Node

The Scan8 Worker Node is a component of the Scan8 project that runs new jobs as soon as they are updated with information about them in the Redis Queue. Its main duty is to carry out the actual file scanning for harmful threats and to give the Coordination Node the results.

## Local Setup Guide

1. Open a terminal, then navigate to the ```Worker``` directory.
2. Install the dependencies using ```pip3 install -r requirements.txt```
3. Use ```python3 app.py``` to run the worker node program.
