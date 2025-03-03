const express = require('express');
const app = express();
const port = 9696;
const fs = require('fs');
const https = require('https');

var options = {
  key: fs.readFileSync('/etc/httpd/conf/iconn.key'),
  cert: fs.readFileSync('/etc/httpd/conf/iconn.crt')
};

app.use(function(req, res, next) {

  const origins = [
    'https://iconntest.hrd-s.com/'
  ];
  for ( origin of origins ) {
    if (req.headers.referer){
    if ( req.headers.referer.indexOf(origin) > -1 ) {
      res.header("Access-Control-Allow-Origin", origin);
    }

  }
}

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, application/json, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


//const server = https.createServer(app, options);
const server = https.createServer( options,  app );

const io = require('socket.io').listen(server);
io.eio.pingTimeout = 120000;
io.eio.pingInterval = 50000;

server.listen(port, () => {
  console.log('Running on port#: ' + port);
});

io.on('connection', function(socket) {

  console.log("con");
  
        socket.on('entered', function(data) {
              socket.on('disconnect', function() {
              });
        });

        socket.on('newUpdate', function(data) {
            io.emit('updateReceived', data)
        });

});
