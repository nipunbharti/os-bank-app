var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var joinedRoom;
var room = 'abc123';

// var nsp = io.of();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('room', function(room){
  	console.log("Room:",room);
  	socket.join(room);
  })

  socket.on('send message', function(){
  	io.in(room).emit('message','Hello room!');
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
