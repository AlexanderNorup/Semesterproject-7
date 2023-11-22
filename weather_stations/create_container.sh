#!/bin/bash

while getopts "f:" opt
do
   case "$opt" in
      f ) filename="$OPTARG" ;;
   esac
done

if [ -z "$filename" ] 
then
   echo "Please specify a file using \`$1 -f filename\`. DO NOT INCLUDE .csv!";
   exit 1
fi

docker build --build-arg file=$filename -t registry.gitlab.sdu.dk/alnoe20/docker-images/data_importer:$filename . 

echo "Created a docker-image tagged 'registry.gitlab.sdu.dk/alnoe20/docker-images/data_importer:$filename'"