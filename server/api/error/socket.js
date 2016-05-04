/**
 * create by Jocs 2016.05.04
 */

import Error from './model'

const processError = (socket, e) => {
	Error.findById(e._id)
		.populate({
			path: 'environment',
			select: 'url location'
		})
		.populate({
			path: 'userAgentInfo',
			select: 'browser'
		})
		.select('environment userAgentInfo message errorType time user appId')
		.then(doc => {
			socket.to(doc.appId).emit('errorMessage', doc)
		})
		.catch(err => {
			console.log(err)
		})
}

const register = socket => {
	Error.schema.post('save', e => {
		processError(socket, e)
	})
}

export default register
