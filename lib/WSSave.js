var http = require('http');
var url = require('url');
var WSHostName = 'amsbizstage.seg.org';
var WSPathName = '/PersonifyDataServicesPSUPP/PersonifyData.svc/';

var header = "Basic " + "d2ViYWRtaW46dzNiQGRtaW4x";

var WSSave = function(itemNo, entityName, eNew, eObj, next) {
    var returnStatus;
    var returnBody;
    
    console.log('entering save --',eNew);
    for (var key in eObj) {
        if (key != '__rowNum__') {
            eNew[key] = eObj[key];
        }
    }
//    console.log('Before stringify', eNew);
    var dataString = JSON.stringify(eNew);
    console.log('Should save this', dataString);
    
    var postHeaders = {
        'Content-Type' : 'application/json',
        'Authorization' : header,
        'Content-Length' : dataString.length
    };
    var postOptions = {
        host : WSHostName,
        path : WSPathName + "Save?EntityName='" + entityName + "'",
        method : 'POST',
        headers : postHeaders
    };
    
    var reqPost = http.request(postOptions, function(res) {
//        console.log("Save Status: ",res.statusCode)
        res.on('data', function(d) {
//            console.info('POST result:\n');
//            process.stdout.write(d);
//            console.info('\n\nPOST Call completed');
            returnBody = d;
            returnStatus = res.statusCode;
            next({'itemNo' : itemNo, 'Object' : d});
        });
    });
    reqPost.write(dataString);
    reqPost.end();
    reqPost.on('error',function(e) {
        returnStatus = e;
        returnBody = 'Error';
        console.error(e);
    });
    
    return {Status : returnStatus, Body : returnBody};
    
};

module.exports = WSSave;


