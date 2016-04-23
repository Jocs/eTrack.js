import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema
const model = mongoose.model

const UserSchema = new Schema({
	userName: String,
	companyName: String,
	email: {type: String, lowercase: true},
	applycation: [{appName: String, appId: String, appUrl: String}],
	signupDate: {type: Date, default: Date.now()},
	hashPassword: String,
	salt: String
})

UserSchema
.virtual('password')
.set(password => {
	this._password = password
	this.salt = this.makeSalt()
	this.hashPassword = this.cryptoPassword(password)
})
.get(() => this._password)

const User = model('User', UserSchema)

export default User

