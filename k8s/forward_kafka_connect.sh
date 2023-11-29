#!/bin/bash

echo Port forwarding kafka-connect to localhost:8083
kubectl port-forward service/kafka-connect -n semesterproject 8083:8083
