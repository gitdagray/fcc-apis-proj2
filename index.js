// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
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
