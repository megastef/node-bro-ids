var parse = require ('csv-parse'),
    Tail  = require('tail-forever').Tail,
    evt   = require('events');

function bro (directory)
{
       var ls = require ('ls')
       this.files = ls (directory + '/*.log')
       this.tails = []
       evt.EventEmitter.call(this);
       bro.prototype.__proto__ = evt.EventEmitter.prototype;
       process.on ('exit', function () {
            // todo write revovery file
            //position = tail.unwatch()
       })
       //return this;
}
bro.prototype.watch = function ()
{
    for (x in this.files)
        this.tailLog(this.files[x])
}

bro.prototype.tailLog = function  (file)
{
    //console.log (file)
    // todo save postion on exit and start there again
    tail = new Tail(file.full, {start: 0} )
    var self = this;
    tail.on("line", function(data) {
        //console.log(file.name);
        try {
            var broEvent = JSON.parse (data);
            if (broEvent.ts)
                broEvent.ts = new Date (broEvent.ts*1000)
            broEvent.event_source=file
            self.emit (file.name, broEvent)
        }  catch (ex) {
            console.log (ex)
        }

    });
    this.tails.push (tail)
    //tail.watch()
}



var b = new bro('./testdata')
b.watch()
/*b.on ('http', function (e) {
    console.log (e)
})*/

b.on ('conn', function (e) {
    console.log (e)
})

setTimeout (function (){}, 30000)
//bro()

