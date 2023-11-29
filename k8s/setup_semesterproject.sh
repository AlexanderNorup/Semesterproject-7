#!/bin/bash

# All these commands are run from one of the virtual machines.
# If using this script locally, remove `microk8s` from the commands
microk8s kubectl create namespace stackable

# Run only once: 
# microk8s helm repo add stackable-stable https://repo.stackable.tech/repository/helm-stable/
# Install stackable operators into stackable namespace
#Common
microk8s helm install --wait commons-operator stackable-stable/commons-operator --version 23.7.0 -n stackable
microk8s helm install --wait --set kubeletDir=/var/snap/microk8s/common/var/lib/kubelet secret-operator stackable-stable/secret-operator --version 23.7.0 -n stackable
# HDFS
microk8s helm install --wait zookeeper-operator stackable-stable/zookeeper-operator --version 23.7.0 -n stackable
microk8s helm install --wait hdfs-operator stackable-stable/hdfs-operator --version 23.7.0 -n stackable
#Spark
microk8s helm install --wait spark-k8s-operator stackable-stable/spark-k8s-operator --version 23.7.0 -n stackable

# Make semesterproject namespace 
microk8s kubectl create namespace semesterproject

# Setup Zoo-Keeper cluster
microk8s kubectl apply -f zookeeper.yml -n semesterproject
microk8s kubectl apply -f znode.yml -n semesterproject

# Setup HDFS cluster
# BEFORE running this, use `watch microk8s kubectl get pods -n semesterproject` to monitor the zookeeper and znode pods.
#  only start the pod below when these are done starting.
microk8s kubectl apply -f hdfs.yml -n semesterproject

## KAFKA
# We install kafka in it's own namespace because it comes with it's own Zookeper instance.
#  this is because this magic helm chart is made by a different company, so they can't talk together
# How lovely <3

microk8s kubectl create namespace kafka
#Add Strimzi repo (only once)
# microk8s helm repo add strimzi https://strimzi.io/charts
microk8s helm install my-strimzi-kafka-operator strimzi/strimzi-kafka-operator --version 0.38.0  --set watchAnyNamespace=true -n kafka

# Install kafka
microk8s kubectl apply -f kafka.yaml -n semesterproject

## Wait till kafka is up `watch microk8s kubectl get pods -n semesterproject`

# Kafka "extras": Redpanda webui, kafka-connect, kafka ksqldb
microk8s kubectl apply -f kafka-extra.yaml -n semesterproject

## MONGO DB
microk8s kubectl apply -f mongodb.yaml -n semesterproject

# When everything is up, you can watch the pods with the command below:
# watch microk8s kubectl get pods -n semesterproject -o wide

# If you want to watch all pods, do 
# watch microk8s kubectl get pods --all-namespaces

## Spark 
# In order to supply code to spark applications you have two options (at least when using the Stackable operator through K8S):
# - Referencing an S3 server
# - Referencing a local file inside the application-image
# The issue is that referencing the local filesystem means you have to re-build the docker-image if you want to change the application, and supply the application data as arguments
# The other issue of referencing only the local filesystem is that the spark-logs are esssentially lost.
# Thus, we decided to go with an S3 setup. For this, we use the open-source system "minio"
# Install using the default username "admin" and password "password". Also create a bucket for the spark-logs
microk8s helm install minio oci://registry-1.docker.io/bitnamicharts/minio --set service.type=NodePort --set defaultBuckets=spark-logs --set auth.rootUser=admin --set auth.rootPassword=password -n semesterproject
# Setup secrets for Spark to reference
microk8s kubectl apply -f spark-s3-secrets.yaml -n semesterproject
# Setup a spark history server, pointing to our new bucket. Uses for visualizing the logs (optional)
microk8s kubectl apply -f spark-history-server.yaml -n semesterproject

