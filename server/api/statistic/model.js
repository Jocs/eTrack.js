/**
 * create by Jocs 2016.04.28
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StatisticSchema = Schema({
	appId: String,
	ErrorPerDay: [{date: String, js: {type: Number, default: 0}, ajax: {type: Number, default: 0}}]
})

const Statistic = mongoose.model('Statistic', StatisticSchema)

export default Statistic
