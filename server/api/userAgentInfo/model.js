/**
 * create by Jocs 2016.04.28
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserAgentInfoSchema = Schema({
	appId: {type: Schema.Types.ObjectId, ref: 'App'},
	browser: String,
	cpu: String,
	device: String,
	engine: String,
	os: String,
	ua: String,
	createdAt: {type: Date, default: Date.now, expires: '30d'}
})

const UserAgentInfo = mongoose.model('UserAgentInfo', UserAgentInfoSchema)

export default UserAgentInfo

