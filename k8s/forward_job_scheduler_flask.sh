#!/bin/bash

echo Port forwarding job-scheduler-flask to http://localhost:5000
kubectl port-forward service/job-scheduler-flask -n semesterproject 5000:5000