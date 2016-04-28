/**
 * create by Jocs 2016.04.28
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const EnvironmentSchema = Schema({
	appId: String,
	location: {accuracy: Number, latitude: Number, longitude: Number},
	dependencies: String,
	runTime: Number,
	url: String,
	version: String,
	viewPortHeight: Number,
	viewPortWidth: Number,
	loadOn: String,
	createAt: {type: Date, default: Date.now(), expires: '30d'}
})

const Environment = mongoose.model('Environment', EnvironmentSchema)
export default Environment
