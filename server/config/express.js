/**
 * create by Jocs 2016.04.23
 */

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const expressInit = (app, rootPath) => {
	app.use(express.static(`${rootPath}`))
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())
	app.use(morgan('dev'))
	app.use(cookieParser())
}

export default expressInit
