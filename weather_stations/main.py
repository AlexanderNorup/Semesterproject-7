import pandas as pd
from datetime import datetime, timedelta
from kafka import KafkaProducer

KAFKA_BROKERS: str = (
    "strimzi-kafka-bootstrap.semesterproject:9092"  # <service name>.<namepsace>:<port>
)

def main():
  producer = KafkaProducer(bootstrap_servers=[KAFKA_BROKERS])
  topic = "weather_data"

  file = 'north.csv'
  chunksize = 1000
  # 1 second run time = 1 hour weather time
  time_scale = 60 * 60 
  program_start_time = datetime.now()
  data_start_time = datetime(2009, 12, 31, 23, 59)

  with pd.read_csv(file, chunksize = chunksize) as reader:
    for chunk in reader:
      chunk['datetime'] = pd.to_datetime(chunk['date'] + ' ' + chunk['time'])
      for index, row in chunk.iterrows():
        while row['datetime'] - data_start_time > (datetime.now() - program_start_time) * time_scale:
          continue
        row_without_datetime = row.drop('datetime')
        payload = bytes(row_without_datetime.to_json(), 'utf-8')
        producer.send(topic, payload)
        #print(payload)

if __name__ == "__main__":
  main()