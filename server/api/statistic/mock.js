/**
 * create by Jocs 2016.05.06
 */
import _ from 'lodash'
import Statistic from './model'

const appId = '57374022e9e14bcec793b06b'

const date = _.flatMap(_.range(4), m => _.range(30).map(d => `2016/${m + 1}/${d + 1}`)).concat(
	_.range(14).map(d => `2016/5/${d + 1}`)
)

const gRandom = () => Math.floor(Math.random() * 50 + 50)

const errorPerDay = date.map(d => ({ date: d, js: gRandom() - 30, ajax: gRandom() }))


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

