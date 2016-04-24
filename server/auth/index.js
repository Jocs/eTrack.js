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
		if (error) res.status(401).json(error)
		if (!user) res.status(404).json({message: '登陆出错，请重试'})
		const token = getToken(user._id, user.email)
		res.json({token})
	})(req, res, next)
})

export default router
