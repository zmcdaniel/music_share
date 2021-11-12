const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 8080;

// Web Socket / Long polling with socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Socket events
io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('song change', (msg) => {
		console.log('message: ' + msg);

		// emit message to everyone
		io.emit('notify song change', msg);
	});
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