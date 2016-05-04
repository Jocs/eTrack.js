/**
 * create by Jocs 2016.04.22
 */
import express from 'express'
import http from 'http'
import io from 'socket.io'


import config from './server/config'
import router from './server/router'
import socketConfig from './server/config/socket.io'

const app = express()
const server = http.createServer(app)
const socketio = io.listen(server)
const DIRNAME = __dirname

Object.keys(config).forEach(key => config[key](app, DIRNAME))
router(app, DIRNAME)
socketConfig(socketio)

server.listen(process.env.PORT || 8080, function onListen() {
	const address = server.address()
	console.log('Listening on: %j', address)
	console.log(' -> that probably means: http://localhost:%d', address.port)
})
