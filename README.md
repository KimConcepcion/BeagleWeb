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

