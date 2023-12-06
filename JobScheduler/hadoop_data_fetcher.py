from hdfs_client import get_hdfs_client
from json import loads, dumps
import sys
def fetch_from_hadoop(id):
    client = get_hdfs_client()
    
    path = "/processed_weather_data/" + id

    parsedContents = []
    files = []
    for dir in client.list(path):
        if dir == "_SUCCESS":
            continue
        for file in client.list(path + "/" + dir):
            files.append(path + "/" + dir + "/" + file)
    
    for file in files:
        with client.read(file, encoding='utf-8', delimiter='\n') as reader:
            for line in reader: #Each line of the file is it's own JSON ojbect
                if line.strip() == "":
                    continue

                try:
                    model = loads(line) 
                    # Attempt to re-add state
                    state = file.split("state=")[1][0:2] #Re-add state
                    model["State"] = state
                    parsedContents.append(model)
                except Exception as e:
                    print("Failed to parse line \"" + line + "\". Exception: " + str(e), file=sys.stderr)

    return dumps(parsedContents)

def list_ids():
    client = get_hdfs_client()
    path = "/processed_weather_data"

    files = []
    for dir in client.list(path):
        files.append(dir)
    
    return dumps(files)