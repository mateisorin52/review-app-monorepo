#!/bin/bash

# More like build and don't deploy -> deploy is manual
cd ../
docker build -t review-app:v2 .

docker tag review-app:v2 sorinmatei/review-app:v2

docker push sorinmatei/review-app:v2

kubectl get pods
