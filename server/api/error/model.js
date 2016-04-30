/**
 * create by Jocs 2016.04.28
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ErrorSchema = new Schema({
	errorType: String,
	lineNumber: String,
	columnNumber: String,
	fileName: String,
	message: {type: String, required: true},
	stack: String,
	environment: {type: Schema.Types.ObjectId, ref: 'Environment'},
	user: String,
	userAgentInfo: {type: Schema.Types.ObjectId, ref: 'UserAgentInfo'},
	time: String,
	appId: {type: Schema.Types.ObjectId, ref: 'App'},
	appOwner: {type: Schema.Types.ObjectId, ref: 'User'},
	logger: String,
	createdAt: {type: Date, default: Date.now, expires: 30}
})

const Error = mongoose.model('Error', ErrorSchema)

export default Error

