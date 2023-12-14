#!/bin/bash

echo Port forwarding kafka to localhost:9092
kubectl port-forward service/strimzi-kafka-bootstrap -n semesterproject 9092:9092
