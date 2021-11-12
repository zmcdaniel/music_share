module.exports = (io, socket) => {
	const changeSong = (payload) => {
		console.log(">>changeSong - changing song to:" + payload);
		socket.broadcast.emit('broadcasted:song:change', payload);
	};

	socket.on("song:change", changeSong);
};