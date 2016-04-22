/**
 * create by Jocs 2016.04.22
 */
import express from 'express'
import http from 'http'

import config from './server/config'
import router from './server/router'

const app = express()
const server = http.createServer(app)
const DIRNAME = __dirname

Object.keys(config).forEach(key => config[key](app, DIRNAME))
router(app, DIRNAME)

server.listen(process.env.PORT || 8080, function onListen() {
	const address = server.address()
	console.log('Listening on: %j', address)
	console.log(' -> that probably means: http://localhost:%d', address.port)
})
