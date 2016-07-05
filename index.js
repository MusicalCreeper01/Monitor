/* -- Imports -- */
var express = require('express');
var app = express();
var http = require('http').Server(app);

//Process information
var ps = require('psnode');
var pusage = require('pidusage');

var $ = require('jquery')

app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/'));


var formatBytes = function(bytes, precision) {
  var kilobyte = 1024;
  var megabyte = kilobyte * 1024;
  var gigabyte = megabyte * 1024;
  var terabyte = gigabyte * 1024;

  if ((bytes >= 0) && (bytes < kilobyte)) {
    return bytes + ' B   ';
  } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
    return (bytes / kilobyte).toFixed(precision) + ' KB  ';
  } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
    return (bytes / megabyte).toFixed(precision) + ' MB  ';
  } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
    return (bytes / gigabyte).toFixed(precision) + ' GB  ';
  } else if (bytes >= terabyte) {
    return (bytes / terabyte).toFixed(precision) + ' TB  ';
  } else {
    return bytes + ' B   ';
  }
};


/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

ps.list(function(err, results) {
    if (err)
        throw new Error( err );
    var index;
    console.log(results.length);
    for (index = 0; index < results.length; ++index) {
        debugStats(results[index].pid);
    }
    //console.log(results); // [{pid: 2352, command: 'command'}, {...}] 
});


function debugStats(pid){
    pusage.stat(pid, function(err, stat) {
        if(stat == undefined)
            return;
        
        console.log("PID: %s - CPU: %s - RAM: %s", pid, stat.cpu, formatBytes(stat.memory));
            //console.log('Pcpu: %s', stat.cpu)
            //console.log('Mem: %s', stat.memory) //those are bytes
    });
}



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});