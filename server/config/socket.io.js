/**
 * create by Jocs 2016.05.04
 */
import register from '../api/error/socket'

const socketInit = socketio => {
	register(socketio)
	socketio.on('connection', socket => {

		socket.address = socket.handshake.address !== null
		? `${socket.handshake.address} - ${socket.handshake.time}` : process.env.DOMAIN
		socket.connectAt = new Date()

		socket.emit('preSubscribe', 'connect')
		socket.on('subscribe', room => {
			socket.join(room)
		})
		socket.on('unsubscribe', room => {
			socket.leave(room)
		})

		console.info('[%] CONNECTED', socket.address)
	})
}

export default socketInit
