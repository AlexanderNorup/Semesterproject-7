#!/bin/bash

echo Port forwarding mongo-db express to http://localhost:8084
kubectl port-forward service/mongo-express -n semesterproject 8084:8084