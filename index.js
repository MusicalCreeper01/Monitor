/* -- Imports -- */
//Process information
//Windows and mac
//var ps = require('psnode');
var ps = require('ps-man');
var pusage = require('pidusage');

var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/'));

/*
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
};*/

//windows and mac
/*ps.list(function(err, results) {
    if (err)
        throw new Error( err );
    var index;
    console.log(results.length);
    for (index = 0; index < results.length; ++index) {
        debugStats(results[index].pid);
    }
    //console.log(results); // [{pid: 2352, command: 'command'}, {...}] 
});*/
/*
ps.list(function(err, results) {
  if (err)
        throw new Error( err );
    var index;
    console.log(results.length);
    for (index = 0; index < results.length; ++index) {
        debugStats(results[index].pid, results[index].command);
    }
});*/

/*
function debugStats(pid, command){
    pusage.stat(pid, function(err, stat) {
        if(stat == undefined)
            return;
        
        console.log("PID: %s - CPU: %s - RAM: %s - Command: %s", pid, stat.cpu, formatBytes(stat.memory), command);
    });
}*/

function GetProcessList (callback){
    ps.list(function(err, results) {
        if (err)
            throw new Error( err );
        var index;
        console.log(results.length + " processes");
        var p_data = [];
        var processed = 0;
        for (index = 0; index < results.length; ++index) {
            GetProcessesData(results[index].pid, results[index].command, function(data){
                p_data.push(data);
                ++processed;
                if(processed == results.length-1){
                    callback(p_data);
                }else{
			console.log(processed + "/" + results.length);
		}
            });
        }
    }); 
}

function GetProcessesData (pid, command, callback){
    pusage.stat(pid, function(err, stat) {
        if(stat == undefined)
            return;
        callback({"pid": pid, "command": command, "cpu": stat.cpu, "ram": stat.memory});
    });
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('ready', function(){
        console.log("Preparing process list")
        GetProcessList(function(data){
            console.log("Sent process list")
            socket.emit('process_list', data);
            
        });
    });
    
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
