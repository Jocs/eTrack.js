/**
 * create by Jocs 2016.04.28
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BrowserSchema = Schema({
	appId: String,
	browsers: [{nameVersion: String, quatity: {type: Number, default: 0}}]
})

const Browser = mongoose.model('Browser', BrowserSchema)

export default Browser
