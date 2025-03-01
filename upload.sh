#!/bin/bash

echo "(1) Uploading web files STARTED..."

scp -r src docker kim@beagle:~/projects/BeagleWeb

echo "(2) Uploading web files DONE..."
