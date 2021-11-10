const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 8080;

// Web Socket initialization
const ws = require('ws');
const wsServer = new ws.Server({noServer: true});

// Main index page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

// music
app.get('/music.mp3', function(req, res) {
	res.sendFile(path.join(__dirname, '/music.mp3'));
});

const server = app.listen(port);
server.on('upgrade', (request, socket, head) => {
	wsServer.handleUpgrade(request, request.socket, Buffer.alloc(0), onSocketConnect);
});

const clients = new Set();

function onSocketConnect(ws) {
	clients.add(ws);
	ws.on('message', function(message) {
		let data = JSON.parse(message);
		console.log(data);
		for (let client of clients) {
			client.send(JSON.stringify(data));
		}
	});

	ws.on('close', function() {
		clients.delete(ws);
	});
}

// Get local network IP address
let networkInterfaces = os.networkInterfaces();
console.log('Private Network IP: http://' + networkInterfaces['Ethernet'][4]['address'] + ':' + port)
console.log('Server started at http://localhost:' + port);