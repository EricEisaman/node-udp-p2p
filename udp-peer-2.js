// NODE UDP Server
var PORT = 8100;
var HOST = '192.168.1.193';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    send('Message received at peer.',remote.address,remote.port);
});

var send = function(msg,address,port){
  let m = new Buffer(msg);
  server.send(m, 0, m.length, port, address, function(err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + address +':'+ port);
  });
}

server.bind(PORT, HOST);

//*************************************//

// Set up Rendevous

var p2p = require('./rendevous')
let cfg = {
  mySecretKey : 'node',
  stunPort : 19302,
  stunHost : 'stun.l.google.com',
  rendevousURL : 'http://192.168.1.193:3000',
  peerSecretKey : 'es-modules'
}
p2p.config(cfg)
p2p.start()
