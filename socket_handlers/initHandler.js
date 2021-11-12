module.exports = (io, socket) => {
	const connectUser = () => {
		console.log(">>connectUser");
	};

	const disconnectUser = () => {
		console.log(">>disconnectUser");
	};

	io.on('connect', connectUser);
	socket.on('user:disconnect', disconnectUser);
};