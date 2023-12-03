import argparse
import os
import requests

def schedule_job(name, fromDate, toDate):
    yaml_file = '''
---
apiVersion: spark.stackable.tech/v1alpha1
kind: SparkApplication
metadata:
  name: spark-data-collector-{}
spec:
  version: "1.0"
  sparkImage: docker.stackable.tech/stackable/spark-k8s:3.3.0-stackable0.0.0-dev
  mode: cluster
  mainApplicationFile: s3a://spark-apps/SparkDataCollector-1.0-SNAPSHOT.jar
  mainClass: dk.sdu.mmmi.softwareengineering.SparkDataCollector
  args:
    - "{} {}"
  logFileDirectory:
    s3:
      prefix: eventlogs/
      bucket:
        reference: spark-history
  s3connection:
    # S3 credentials to access the data
    reference: data-connection
  sparkConf:
    spark.hadoop.fs.s3a.aws.credentials.provider: "org.apache.hadoop.fs.s3a.SimpleAWSCredentialsProvider"
    # The uri of the MinIO S3 server
    spark.hadoop.fs.s3a.endpoint: "http://minio:9000"
  driver:
    resources:
      cpu:
        min: "1"
        max: "1"
      memory:
        limit: "1Gi"
  executor:
    instances: 1
    resources:
      cpu:
        min: "1"
        max: "1"
      memory:
        limit: "1Gi"
  sparkConf:
    spark.executor.extraClassPath: "/dependencies/jars/hadoop-aws-3.2.0.jar:/dependencies/jars/aws-java-sdk-bundle-1.11.375.jar"
  deps:
    packages:
      - org.apache.spark:spark-avro_2.12:3.3.0
    '''

    templateURL = "http://minio:9000/spark-apps/template.yaml"

    try:
      updatedTemplate = requests.get(templateURL)
      if updatedTemplate.status_code == 200:
        yaml_file = updatedTemplate.text
        print("Fetched updated YAML file from " + templateURL)
      else:
        print("Using hardcoded fallback YAML file because the GET request to " + templateURL + ", returned status " + str(updatedTemplate.status_code) + ", with response:\n---\n" + updatedTemplate.text + "\n---")
    except Exception as e:
      print("Could not reach Minio for updated YAML file. Using hardcoded fallback. Error: " + str(e))

    # Insert the fields into the template
    yaml_file = yaml_file.format(name, fromDate, toDate)

    with open('spark_app.yaml', 'w') as file:
        file.write(yaml_file)

    statusCode = os.system("kubectl apply -f spark_app.yaml --insecure-skip-tls-verify -n=semesterproject")
    return statusCode == 0

if __name__ == "__main__":
    parser = argparse.ArgumentParser("Job Scheduler")
    parser.add_argument("name", help="The unique name of the job to be created", type=str)
    parser.add_argument("fromDate", help="The date which it should be from, yyyy-mm-ddThh:mm:ssZ", type=str)
    parser.add_argument("toDate", help="The date which it should be to, yyyy-mm-ddThh:mm:ssZ", type=str)
    args = parser.parse_args()

    schedule_job(args.name, args.fromDate, args.toDate)