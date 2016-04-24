import passport from 'passport'
import express from 'express'

import { getToken } from './service'
import setUp from './passport'

// passport set up
setUp()

const router = express.Router()

router.post('/', function login(req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		const error = err || info
		if (error) return res.json({code: 0, error})
		if (!user) return res.json({code: 0, message: '登陆出错，请重试'})
		const token = getToken(user._id, user.email)
		res.json({code: 1, data: {
			token,
			_id: user._id,
			email: user.email,
			userName: user.userName,
			portrait: user.portrait
		}})
	})(req, res, next)
})

export default router
