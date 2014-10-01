#bro ids for nodejs

The idea is to do processing events from [BRO IDS](https://www.bro.org) in nodejs - this is a simple first step  by parsing the bro log files 'online' and
generate new events when any of the logs gets modified.

## the setup of bro itself

Enable JSON logging to your 'site/local.bro'
```
@load tuning/json-logs
```

## install this module

```
npm install bro-ids
```

## Use the events in node.js

Maybe you simply want to store the events to Redis, Crate, Elasticsearch whatever without waiting for the BRO team to hack this in C++ or bro scripts (they are nice - but not for generic programming).
Or imagine that you make your own version of fail2ban or scan back when you recognize a port scan.

UNIX timestamps of the events are converted to JavaScript timestamps and event_source contains origin of Event (name of log in 3 version with path, without, and without extension .log).
event listeners must be registered to the basename of the log file, e.g. http.log would need a registration for 'http'.


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
