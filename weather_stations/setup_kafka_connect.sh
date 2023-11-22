#!/bin/bash
#Pre-requirement is to port forward kafka connect: kubectl port-forward svc/kafka-connect 8083:8083 -n semesterproject
curl -X POST \
http://127.0.0.1:8083/connectors \
-v \
-H 'Content-Type: application/json' \
-d '{
    "name": "hdfs-sink",
    "config": {
        "connector.class": "io.confluent.connect.hdfs.HdfsSinkConnector",
        "tasks.max": "2",
        "topics": "weather-data",
        "hdfs.url": "hdfs://simple-hdfs-namenode-default-0:8020",
        "flush.size": "10000",
        "format.class": "io.confluent.connect.hdfs.avro.AvroFormat",
        "key.converter.schemas.enable":"false",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "key.converter.schema.registry.url": "http://kafka-schema-registry.kafka:8081", 
        "value.converter.schemas.enable":"false",
        "value.converter.schema.registry.url": "http://kafka-schema-registry.kafka:8081", 
        "value.converter": "org.apache.kafka.connect.json.JsonConverter"
    }
}'