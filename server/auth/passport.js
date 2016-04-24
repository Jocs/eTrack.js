import passport from 'passport'
import localPassport from 'passport-local'

import User from '../api/user/model'

const LocalStrategy = localPassport.Strategy

const setUp = () => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
		User.findOne({email: email.toLowerCase()})
		.then(user => {
			if (!user) return done(null, false, {field: 'email', message: '邮箱输入不正确'})
			if (!user.authenticate(password)) {
				return done(null, false, {field: 'password', message: '密码输入不正确'})
			}
			return done(null, user)
		})
		.catch(done)
	}))
}


export default setUp
