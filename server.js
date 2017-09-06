// server.js
// where your node app starts

// init project
var express = require('express');
var strftime = require("strftime");
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.redirect('/api/whoami/');
});

app.get('/api/whoami/',function(request,response,next){
    var result = {
    ipaddress : request.headers['x-forwarded-for'],
    language : request.headers['accept-language'],
    software : request.headers['user-agent']
  };
  
  result.ipaddress = result.ipaddress.split(',')[0];
  result.language = result.language.split(',')[0];
  result.software = result.software.split(/\(([^)]+)\)/)[1]
  
  result = JSON.stringify(result);
  result = addPre(result);
  
  response.send(result);
});

function addPre(result){
  return '<pre>' + result + '</pre>';
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
