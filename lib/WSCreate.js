var http = require('http');
var app = require('../app');
var io = require('socket.io')(app.settings.port);

var header = "Basic " + "d2ViYWRtaW46dzNiQGRtaW4x";
var WSCreate  = function (itemNo, entityName,wsHostName, wsPathName,  next) {
        console.log('In WSCreate',entityName);
    var getHeaders = {
        'Content-Type' : 'application/json',
        'Authorization' : header
    };
    var getOptions = {
        host : wsHostName,
        path : wsPathName + "/Create?EntityName='" + entityName + "'",
        method : 'GET',
        headers : getHeaders
    };
    var result = {};
    var outEntity = {};
    console.log("Creating New Entity Name:"+entityName);
    console.log("build path = "+getOptions.host+getOptions.path);
    var reqGet = http.request(getOptions, function(res) {
        console.log("Create Status: ", res.statusCode);
        res.on('data', function(d) {
            //console.info('GET result:\n');
            process.stdout.write(d);
//            console.info('\n\n GET Call completed');
//            console.log("sending object---",eObject);
              outEntity = JSON.parse(d);
            next({'itemNo':itemNo, 'entityName':entityName, 'eObject':outEntity});
//            console.log("sending new entity---",nEntity);
            
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
    result = {'itemNo':itemNo, 'entityName':entityName, 'eObject':outEntity};
    //io.on('connection',function(socket){
    //    console.log('in wsCreate connection');
    //    socket.emit('Item : Created', itemNo);
    //});
    //io.emit('Item : Created', itemNo);
    return result;
};

module.exports = WSCreate;


