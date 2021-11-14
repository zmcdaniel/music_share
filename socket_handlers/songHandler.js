module.exports = (io, socket) => {
	const changeSong = (payload) => {
		console.log(">>changeSong - changing song to:" + JSON.stringify(payload));
		socket.to(payload.room).emit('broadcasted:song:change', payload.song);
	};

	socket.on("song:change", changeSong);
};