/**
 * create by Jocs
 */
import Statistic from './model'

const appId = '57392f0b6db8d67477ba656b'

const modify = () => {
	Statistic.findOne({appId})
	.then(s => {
		s.errorPerDay.pull({_id: '5739ef455b3181710105de8f'})
		s.save()
	})
	.then(data => {
		console.log(data)
	})
	.catch(console.log.bind(console))
}

export default modify
