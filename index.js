// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/api/whoami", function (req, res) {
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress; 
  if (ip.indexOf(',') > -1){
    ip = ip.slice(0,ip.indexOf(','));
  }
  let lang = req.header('accept-language');
  let sysInfo = req.get('user-agent');
  res.json({
    ipaddress: ip, 
    language: lang, 
    software: sysInfo
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
