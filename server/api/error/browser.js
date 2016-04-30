/**
 * create by Jocs 2016.05.01
 */

import fs from 'fs'
import _ from 'lodash'
import Browser from '../browser/model'

const empty = err => err && console.log(err)

const readFileHandle = (err, data) => {
	if (err) console.log(err)
	else {
		const browsers = data.split('\n').slice(1)
		const bs = browsers.reduce((acc, b) => {
			const infos = b.split(' ')
			acc.push({appId: infos[0], nameVersion: infos[1], quatity: infos[2]})
			return acc
		}, [])
		const preSave = _.groupBy(bs, 'appId')
		const promises = Object.keys(preSave)
			.map(key => {
				Browser.findOne({appId: key})
				.then(d => {
					if (!d) {
						const browsers = preSave[key].reduce((acc, b) => {
							const exist = acc.some(i => i.nameVersion === b.nameVersion)
							if (exist) {
								return acc.map(i => {
									if (i.nameVersion === b.nameVersion) i.quatity ++
									return i
								})
							} else {
								acc.push({nameVersion: b.nameVersion, quatity: 1})
								return acc
							}
						}, [])
						const browser = new Browser({
							appId: key,
							browsers
						})
						return browser.save()
					} else {
						const bs = preSave[key]
						let s = bs.shift()
						while (s) {
							const exist = d.browsers.some(b => b.nameVersion === s.nameVersion)
							exist ? d.browsers.forEach(b => b.nameVersion === s.nameVersion && b.quatity++)
									: d.browsers.push({nameVersion: s.nameVersion, quatity: 1})
							s = bs.shift()
						}
						return d.save()
					}
				})
			})

		Promise.all(promises)
			.then(data => {
				fs.writeFile(`${__dirname}/browser.txt`, '', 'utf8', empty)
			})
			.catch(err => err && console.log(err))
	}
}

export const initBrowser = () => {
	setInterval(() => {
		fs.readFile(`${__dirname}/browser.txt`, 'utf8', readFileHandle)
	}, 1000)
}
