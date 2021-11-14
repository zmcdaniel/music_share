module.exports = (io, socket) => {
	const changeRoom = (payload) => {
		console.log(">>changeRoom - changing room to:" + payload);
		io.in(socket.id).socketsJoin(payload);
	};

	socket.on("room:change", changeRoom);
};