import User from './model'

export const createUser = (req, res) => {
	console.log(req.body)
	const user = new User(req.body)
	user.save()
	.then(u => {
		res.send({code: 1, u})
	})
	.catch(err => {
		res.send({code: 0, err})
	})
}
