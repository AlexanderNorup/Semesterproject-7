#!/bin/bash
kubectl exec -n semesterproject --stdin --tty deployment/kafka-ksqldb-cli -- ksql http://kafka-ksqldb-server:8088