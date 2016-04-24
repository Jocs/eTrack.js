import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import compose from 'composable-middleware'
import basicConfig from '../config/basic'
import User from '../api/user/model'

const validateToken = expressJwt({secrets: basicConfig.secrets.session})

export const isAuthenticated = () => {
	return compose()
	.use((req, res, next) => {
		if (req.query && req.query.hasOwnPropery('access-token')) {
			req.headers.authorization = 'Bearer ' + req.query.access_token
		}
		validateToken(req, res, next)
	})
	.use((req, res, next) => {
		User.findById(req.user._id)
		.then(user => {
			if (!user) return res.status(401).send('Unauthorized')
			req.user = user
			next()
		})
		.catch(next)
	})
}

export const getToken = (id, email) => {
	return jwt.sign({_id: id, email}, basicConfig.secrets.session, {expiresIn: '7d'})
}
