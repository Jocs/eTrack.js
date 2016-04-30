/**
 * create by Jocs 2016.05.01
 */

import fs from 'fs'
import _ from 'lodash'
import Browser from '../browser/model'

const empty = err => console.log(err)

const readFileHandle = (err, data) => {
	if (err) console.log(err)
	else {
		const browsers = data.split('\n').slice(1)
		const bs = browsers.reduce((acc, b) => {
			const infos = b.split(' ')
			acc.push({appId: infos[0], nameversion: infos[1], quatity: infos[2]})
			return acc
		}, [])
		console.log(_.groupBy(bs, 'appId'))
	}
}

export const initBrowser = () => {
	setTimeout(() => {
		fs.readFile(`${__dirname}/browser.txt`, 'utf8', readFileHandle)
	}, 1000)
}
