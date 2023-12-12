#!/bin/bash

curl -v -X POST -d "name=demo-job" -d "from_date=2010-02-15T05:00:00Z" -d "to_date=2012-03-10T02:00:00Z" localhost:5000/job