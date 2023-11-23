#!/bin/bash
echo Port forwarding Spark History Server to http://localhost:18080
kubectl port-forward service/spark-history-node 18080:18080 -n semesterproject