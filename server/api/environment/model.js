/**
 * create by Jocs 2016.04.28
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const EnvironmentSchema = Schema({
	appId: String,
	location: String,
	dependencies: String,
	runTime: Number,
	url: String,
	version: String,
	viewportHeight: String,
	viewportWidth: String,
	loadOn: String,
	createdAt: {type: Date, default: Date.now, expires: 30}
})

const Environment = mongoose.model('Environment', EnvironmentSchema)
export default Environment
