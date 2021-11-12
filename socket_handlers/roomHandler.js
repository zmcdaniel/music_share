module.exports = (io, socket) => {
	const changeRoom = (payload) => {
		console.log(">>changeRoom - changing room to:" + payload);
	};

	socket.on("room:change", changeRoom);
};