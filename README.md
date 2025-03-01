# BeagleWeb
Lightweight web server on Beaglebone Black based on Tornado.

## Add web server to systemd
Copy service script to /etc/systemd/system folder. (*This is necessary as the webserver.service script is not on the root partition and therefore not present, when systemd is loading and starting services.*)

```
$ sudo cp BeagleWeb/webserver.service /etc/systemd/system
```

Enable the service
```
$ sudo systemctl enable /etc/systemd/system/webserver.service
```

Load new settings
```
$ sudo systemctl daemon-reload
```

Start service
```
$ sudo systemctl start webserver.service
```

Check status of service
```
$ sudo systemctl status webserver.service
```

Check port 3000
```
$ ss -ltpn 'sport = :3000'
```

Output should be something like:
```
State                        Recv-Q                       Send-Q                                             Local Address:Port                                             Peer Address:Port                      Process
LISTEN                       0                            4096                                                           *:3000                                                        *:*                          users:(("grafana",pid=1283,fd=20))
```

Delete bb-code-server if code is using port 3000
```
$ apt-get remove bb-code-server -y
```

Check port 3000 again
```
$ ss -ltpn 'sport = :3000'
```
