/**
 * create by Jocs 2016.04.24
 */
import App from './model'
import User from '../user/model'
import Statistic from '../statistic/model'
import Error from '../error/model'
import Browser from '../browser/model'
import UserAgentInfo from '../userAgentInfo/model'
import Environment from '../environment/model'

export const createApp = (req, res) => {
	const userId = req.body.creator
	const app = new App(req.body)

	Promise.all([app.save(), User.findOne({_id: userId})])
	.then(data => {
		if (data[1].applycations.length >= 5) {
			return Promise.all([App.remove({_id: data[0]._id}), Promise.reject('用户最多能创建5个应用！')])
		}
		// 初始化每天统计数据。
		const sta = new Statistic({
			appId: data[0]._id,
			errorPerDay: [{
				date: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
				js: 0,
				ajax: 0
			}]
		})
		data[1].applycations.push(data[0])
		const promise = new Promise((resolve, reject) => {
			data[1].save()
			.then(user => resolve(data[0]))
			.catch(reject)
		})
		return Promise.all([promise, sta.save()])
	})
	.then(response => {
		console.log(response)
		res.send({code: 1, response: response[0]})
	})
	.catch(err => {
		console.log(err)
		if (err === '用户最多能创建5个应用！') res.send({code: 2, err})
		else res.send({code: 0, err})
	})
}

export const getAll = (req, res) => {
	const creator = req.body.userId
	App
	.find({creator})
	.then(apps => res.send({code: 1, apps}))
	.catch(err => res.status(500).send(err))
}

export const deleteOne = (req, res) => {
	const { appId, userId } = req.params
	const promises = [
		Statistic.findOneAndRemove({appId}),
		Browser.findOneAndRemove({appId}),
		Environment.remove({appId}),
		UserAgentInfo.remove({appId}),
		Error.remove({appId})
	]
	Promise.all(promises)
	.then(data => {
		const deleteUserApplication = User.findOne({_id: userId})
		.then(user => {
			user.applycations.pull({_id: appId})
			return user.save()
		})
		const deleteApp = App.findOneAndRemove({_id: appId})

		return Promise.all([deleteUserApplication, deleteApp])
		.then(response => {
			console.log(response)
			res.send({code: 1, message: '删除应用成功'})
		})
	})
	.catch(err => {
		console.log(err)
		res.send({code: 0, err})
	})
}







