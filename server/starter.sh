#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available
./wait-for-it.sh elemongo:27017 -- npm start