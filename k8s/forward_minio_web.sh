#!/bin/bash

echo Port forwarding Minio Web Interface to http://localhost:9001
kubectl port-forward svc/minio 9001:9001 -n semesterproject
