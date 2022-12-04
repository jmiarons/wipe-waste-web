#!/bin/bash

docker build -t modelapi:0.1 .

docker run -d --name containerprubea -p 9002:8000  modelapi:0.1 