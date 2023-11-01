#!/bin/bash

kubectl run hadoop-it --rm -i --tty --image apache/hadoop:3 -n semesterproject -- bash

#Remmember to set the user before doing any actions:
# export HADOOP_USER_NAME=stackable

# LIST FILES
# hdfs dfs -fs hdfs://simple-hdfs-namenode-default-0.simple-hdfs-namenode-default:8020 -ls /

# Upload file: 
# hdfs dfs -fs hdfs://simple-hdfs-namenode-default-0.simple-hdfs-namenode-default:8020 -put <path to file locally> <place to place on server>

# Read file:
# hdfs dfs -fs hdfs://simple-hdfs-namenode-default-0.simple-hdfs-namenode-default:8020 -cat <place to place on server>

# Delete file:
# hdfs dfs -fs hdfs://simple-hdfs-namenode-default-0.simple-hdfs-namenode-default:8020 -rm <place to place on server>