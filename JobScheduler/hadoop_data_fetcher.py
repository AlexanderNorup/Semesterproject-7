from hdfs_client import get_hdfs_client
from json import load, dumps
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
        with client.read(file) as reader:
            model = load(reader)
            # Attempt to re-add state
            state = file.split("state=")[1][0:2] #Re-add state
            model["State"] = state
            parsedContents.append(model)

    return dumps(parsedContents)

def list_ids():
    client = get_hdfs_client()
    path = "/processed_weather_data"

    files = []
    for dir in client.list(path):
        files.append(dir)
    
    return dumps(files)