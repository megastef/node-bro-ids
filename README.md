#bro ids for nodejs

The idea is to open processing [BRO IDS](https://www.bro.org) events in nodejs - this is a simple first step by by parsing the bro logfiles 'online' and
generate new events when any of the log files gets modified.

# the setup of bro itself

1. Enable JSON logging to your 'site/local.bro'
```
@load tuning/json-logs
```

2. install this module

```
npm install bro-ids
```

3. Use the events in node.js

Imagine that you simply could call iptables --drop for IP's that tried to do a port scan or scan automatically back :)

Maybe you simply want to store the events to Redis, Crate, Elasticsearch whatever without waiting for the BRO team to hack this in C++ or bro scripts (they are nice - but not for generic programming).

UNIX timestamps of the events are converted to JavaScript timestamps and event_source contains origin of Event (name of log in 3 version with path, without, and without extension .log).
Eventlisteners must be registered to the basename of the log file, e.g. http.log would need a registration for 'http'.


```
    var bro = require ('bro-ids')
    // directory with the bro logs
    var b = new bro('./testdata')
    // start watching the files
    b.watch()

    b.on ('http', function (e) {
        console.log (e)
    })

    b.on ('conn', function (e) {
        console.log (e)
    })

    b.on ('ssl', function (e) {
        console.log (e)
    })

    b.on ('x509', function (e) {
        console.log (e)
    })

    b.on ('file', function (e) {
        console.log (e)
    })

    b.on ('weird', function (e) {
        console.log (e)
    })

    b.on ('stats', function (e) {
        console.log (e)
    })


```

# roadmap

## soon

Save position of last read events per file for recovery after restart of the node.js app.

## maybe

Filter functions for events using Regex and field names.

## Just to have it on the roadmap :)

Implementation of brocolli protocol...
