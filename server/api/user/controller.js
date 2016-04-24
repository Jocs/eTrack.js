import User from './model'
import { getToken } from '../../auth/service'

export const createUser = (req, res) => {
	const user = new User(req.body)
	user.save()
	.then(u => {
		const data = {
			token: getToken(u._id, u.email),
			_id: u._id,
			email: u.email,
			userName: u.userName,
			portrait: u.portrait
		}
		res.send({code: 1, data})
	})
	.catch(err => {
		res.send({code: 0, err})
	})
}

export const getMe = (req, res) => {
	const user = req.user
	const data = {
		token: getToken(user._id, user.email),
		_id: user._id,
		email: user.email,
		userName: user.userName,
		portrait: user.portrait
	}
	res.send({code: 1, data})
}

