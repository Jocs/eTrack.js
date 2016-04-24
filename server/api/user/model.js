/**
 * create by Jocs 2016.04.23
 */
import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema

const UserSchema = new Schema({
	portrait: {type: String, default: 'assets/images/user.jpg'},
	userName: String,
	companyName: String,
	email: {type: String, lowercase: true, required: true},
	applycations: [{type: Schema.Types.ObjectId, ref: 'Applycation'}],
	signupDate: {type: Date, default: Date.now()},
	hashPassword: String,
	salt: String
})

UserSchema
.virtual('password')
.set(function(password) {
	this._password = password
	this.salt = this.makeSalt()
	this.hashPassword = this.encryptPassword(password)
})
.get(function() { this._password })

UserSchema
.virtual('token')
.get(function() {
	return {
		userName: this.userName,
		email: this.email,
		id: this._id
	}
})

// const emailValidator = function(value, respond) {
// 	this.constructor.findOne({email: value})
// 	.then(user => {
// 		if (user) respond(false)
// 		else respond(true)
// 	})
// 	.catch(error => { throw error })
// }

// UserSchema
// .path('email')
// .validate(emailValidator, '邮箱已被使用！')

UserSchema.methods = {
	authenticate: function(text) {
		return this.encryptPassword(text) === this.hashPassword
	},
	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64')
	},
	encryptPassword: function(password) {
		if (!password || !this.salt) return ''
		return crypto.pbkdf2Sync(password.toString(), this.salt, 10000, 64).toString('base64')
	}
}

const User = mongoose.model('User', UserSchema)

export default User

