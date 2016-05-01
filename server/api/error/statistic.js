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
		const msgs = data.split('\n').slice(1)
		const msgObj = msgs.reduce((acc, m) => {
			const token = m.split(' ')
			return token[2] === 'ajax' ? [...acc, {appId: token[0], date: token[1], ajax: 1}] : [...acc, {appId: token[0], date: token[1], js: 1}]
		}, [])
		const appIdGroup = _.groupBy(msgObj, 'appId')
		const dateGroup = Object.keys(appIdGroup).reduce((acc, key) => {
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
		console.log(dateGroup)
	}
}

export const initStatistic = () => {
	setTimeout(() => {
		fs.readFile(`${__dirname}/statistic.txt`, 'utf8', readFileHandle)
	}, 1000)
}
