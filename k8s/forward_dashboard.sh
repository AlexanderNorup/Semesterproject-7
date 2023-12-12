#!/bin/bash

echo Port forwarding dashboard to http://localhost:3000
kubectl port-forward service/dashboard -n semesterproject 3000:3000