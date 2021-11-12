const express = require('express');
const path = require('path');
const os = require('os');
const http = require('http');
const { Server } = require("socket.io");

// Create express and port
const app = express();
const port = process.env.PORT || 8080;

// Web Socket / Long polling with socket.io
const server = http.createServer(app);
const io = new Server(server);

// Socket handlers [imports]-- files that are used as 'listeners' for data from the client (front-end javascript)
// these socket handlers respond back to the client application in real time, as the client is listening
const registerInitHandlers = require('./socket_handlers/initHandler');
const registerRoomHandlers = require('./socket_handlers/roomHandler');
const registerSongHandlers = require('./socket_handlers/songHandler');


// Socket events
io.on('connection', (socket) => {
	console.log("connectasdf");
	registerInitHandlers(io, socket); // user connect, disconnect, etc

	registerRoomHandlers(io, socket); // user changes a room
	registerSongHandlers(io, socket); // user changes a song
});

// Static Routes
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/socket.io/socket.io.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/socket.io/socket.io.js'));
});
app.get('/music.mp3', function(req, res) {
	res.sendFile(path.join(__dirname, '/music.mp3'));
});

// Start server
server.listen(port, () => {
	let privateIP = getPrivateIP();
	console.log('listening on *:' + port);
	console.log('Private Network IP: http://' + privateIP + ':' + port)
	console.log('Server started at http://localhost:' + port);
});

function getPrivateIP() {
	// Get local network IP address
	let networkInterfaces = os.networkInterfaces();
	let privateIP = '';
	if (networkInterfaces.hasOwnProperty('Wi-Fi')) {
		privateIP = networkInterfaces['Wi-Fi'][4]['address'];
	} else if (networkInterfaces.hasOwnProperty('Ethernet')) {
		privateIP = networkInterfaces['Ethernet'][4]['address'];
	} else {
		console.log(networkInterfaces);
	}
	return privateIP;
}