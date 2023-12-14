#!/bin/bash

echo Port forwarding mongo-db to mongodb://localhost:27017
kubectl port-forward service/mongodb -n semesterproject 27017:27017