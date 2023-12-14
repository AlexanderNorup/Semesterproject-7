#!/bin/bash

echo Port forwarding redpanda to http://localhost:8081
kubectl port-forward service/redpanda -n semesterproject 8081:8080