/**
 * create by Jocs 2016.05.06
 */
import _ from 'lodash'
import Statistic from './model'

const appId = '571f011a020c19975b2c79f7'

const date = _.flatMap(_.range(12), m => _.range(30).map(d => `${m + 1}/${d + 1}`))

const gRandom = () => Math.floor(Math.random() * 2000 + 4000)

const errorPerDay = date.map(d => ({ date: d, js: gRandom() - 3000, ajax: gRandom() }))


const mock = () => {
	Statistic.findOne({appId})
	.then(doc => {
		doc.errorPerDay = errorPerDay
		doc.save()
		.then(data => {
			console.log('mock data insert success')
		})
		.catch(err => {
			console.log('mock data insert failed')
			console.log(err)
		})
	})
	.catch(err => {
		console.log(err)
	})
}

export default mock

