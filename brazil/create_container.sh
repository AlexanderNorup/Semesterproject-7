#!/bin/bash

while getopts "t:" opt
do
   case "$opt" in
      t ) tag="$OPTARG" ;;
   esac
done

if [ -z "$tag" ] 
then
   echo "Please specify a tag using \`$1 -t tag\`";
   exit 1
fi

docker build -t registry.gitlab.sdu.dk/alnoe20/docker-images/dashboard:$tag . 

echo "Created a docker-image tagged 'registry.gitlab.sdu.dk/alnoe20/docker-images/dashboard:$tag'"