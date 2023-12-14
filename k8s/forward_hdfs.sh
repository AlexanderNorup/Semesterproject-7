#!/bin/bash

echo Port forwarding HDFS Namenode-1 to hdfs://localhost:8020
kubectl port-forward svc/simple-hdfs-namenode-default-1 8020:8020 -n semesterproject