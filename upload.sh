#!/bin/bash

echo "(1) Uploading web files STARTED..."

# scp -r Backend Frontend server.py kim@beagle:~/TornadoEmbeddedLinux
scp -r Backend Frontend server.py kim@10.20.0.10:~/TornadoEmbeddedLinux

echo "(2) Uploading web files DONE..."
