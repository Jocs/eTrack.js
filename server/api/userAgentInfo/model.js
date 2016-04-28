/**
 * create by Jocs 2016.04.28
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserAgentInfoSchema = Schema({
	appId: {type: Schema.Types.ObjectId, ref: 'App'},
	borwser: {name: String, marjor: String, version: String},
	cpu: {architecture: String},
	device: {model: String, type: String, vender: String},
	engine: {name: String, version: String},
	os: {name: String, version: String},
	ua: String,
	createAt: {type: Date, default: Date.now(), expires: '30d'}
})

const UserAgentInfo = mongoose.model('UserAgentInfo', UserAgentInfoSchema)

export default UserAgentInfo

