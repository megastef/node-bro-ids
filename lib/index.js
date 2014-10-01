var Tail = require('tail-forever').Tail,
    evt = require('events');

function bro(directory) {
    var ls = require('ls')
    this.files = ls(directory + '/*.log')
    this.tails = []
    evt.EventEmitter.call(this);
    bro.prototype.__proto__ = evt.EventEmitter.prototype;

}
bro.prototype.watch = function () {
    for (x in this.files)
        this.tailLog(this.files[x])
}

bro.prototype.tailLog = function (file) {
    tail = new Tail(file.full, {start: 0})
    var self = this;
    tail.on("line", function (data) {
        //console.log(file.name);
        try {
            var broEvent = JSON.parse(data);
            if (broEvent.ts)
                broEvent.ts = new Date(broEvent.ts * 1000)
            broEvent.event_source = file
            self.emit(file.name, broEvent)
        } catch (ex) {
            console.log('error parsing log - not in json format? - ', ex)
        }
    });
    this.tails.push(tail)
}

module.exports = bro

