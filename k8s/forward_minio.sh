#!/bin/bash

echo Port forwarding Minio to s3://localhost:9000
kubectl port-forward svc/minio 9000:9000 -n semesterproject
