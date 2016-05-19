/**
 * create by Jocs
 */
import Statistic from './model'

const appId = '57399f57866d675b7eab419b'

const modify = () => {
	Statistic.findOne({appId})
	.then(s => {
		s.errorPerDay.pull({_id: '573c9195131a58e40a310c48'})
		s.save()
	})
	.then(data => {
		console.log(data)
	})
	.catch(console.log.bind(console))
}

export default modify
