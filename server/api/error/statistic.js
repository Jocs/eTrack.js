/**
 * create by Jocs 2016.05.01
 */
import fs from 'fs'
import _ from 'lodash'
import Statistic from '../statistic/model'

const writeFileHandle = err => err && console.log(err)

const readFileHandle = (err, data) => {
	if (err) {
		console.log(err)
	} else {
		Statistic
		.find()
		.then(stacs => {
			const today = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
			const promises = stacs.filter(s => {
				const length = s.errorPerDay.length
				return s.errorPerDay[length - 1] !== today
			})
			.map(s => {
				s.errorPerDay.push({
					date: today,
					js: 0,
					ajax: 0
				})
				return s.save()
			})
			return Promise.all(promises)
		})
		.catch(err => {
			console.log(err)
		})
		const msgs = data.split('\n').slice(1)
		if (!msgs) return false // 没有统计信息直接退出
		const msgObj = msgs.reduce((acc, m) => {
			const token = m.split(' ')
			return token[2] === 'ajax' ? [...acc, {appId: token[0], date: token[1], ajax: 1}]
				: [...acc, {appId: token[0], date: token[1], js: 1}]
		}, [])
		const appIdGroup = _.groupBy(msgObj, 'appId')
		const dataGroup = Object.keys(appIdGroup).reduce((acc, key) => {
			appIdGroup[key].forEach(item => {
				if (acc[key]) {
					if (acc[key][item['date']]) {
						item['ajax'] !== undefined ? acc[key][item['date']]['ajax'] = (acc[key][item['date']]['ajax']) + 1
						: acc[key][item['date']]['js'] = (acc[key][item['date']]['js']) + 1
					} else {
						acc[key][item['date']] = {ajax: 0, js: 0}
						item['ajax'] !== undefined ? acc[key][item['date']]['ajax'] = 1
						: acc[key][item['date']]['js'] = 1
					}
				} else {

					acc[key] = {[item['date']]: {'ajax': 0, 'js': 0}}
					item['ajax'] !== undefined ? acc[key][item['date']]['ajax'] = 1
					: acc[key][item['date']]['js'] = 1
				}
			})
			return acc
		}, {})

		const promises = Object.keys(dataGroup).map(key => {
			return Statistic.findOne({appId: key})
			.then(data => {
				if (data) {
					Object.keys(dataGroup[key]).forEach(k => {
						if (data.errorPerDay.some(d => d.date === k)) {
							data.errorPerDay.forEach(d => {
								if (d.date === k) {
									d.ajax += dataGroup[key][k].ajax
									d.js += dataGroup[key][k].js
								}
							})
						} else {
							if (data.errorPerDay[data.errorPerDay.length - 1].date !== k) {
								data.errorPerDay.push({date: k, ajax: dataGroup[key][k].ajax, js: dataGroup[key][k].js})
							}
						}
					})
					return data.save()
				} else {
					const errorPerDay = Object.keys(dataGroup[key]).map(k => {
						return {
							date: k,
							ajax: dataGroup[key][k].ajax,
							js: dataGroup[key][k].js
						}
					})
					const sta = new Statistic({
						appId: key,
						errorPerDay
					})
					return sta.save()
				}
			})
		})

		Promise.all(promises)
		.then(data => fs.writeFile(`${__dirname}/statistic.txt`, '', 'utf8', writeFileHandle))
		.catch(err => console.log(err))
	}
}

export const initStatistic = () => {
	setInterval(() => {
		fs.readFile(`${__dirname}/statistic.txt`, 'utf8', readFileHandle)
	}, 1000 * 60 * 5)
}
