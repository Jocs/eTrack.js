/**
 * create by Jocs 2016.04.28
 */
import fs from 'fs'
import Error from './model'
import Environment from '../environment/model'
import UserAgentInfo from '../userAgentInfo/model'
import App from '../applications/model'

export const receiveFault = (req, res) => {
	res.status(200).send('fault received thank you!')
}

export const receiveError = (req, res) => {
	// 解构取值
	const { applicationId, errorType, time, logger } = req.body
	const {
		location,
		dependencies,
		loadon,
		runTime,
		url,
		version,
		viewportHeight,
		viewportWidth,
		currentUser
	} = req.body.environment

	const { browser, cpu, device, engine, os, ua } = req.body.environment.userAgentInfo

	const { columnNumber, fileName, lineNumber, message, stack } = req.body.error

	const en = new Environment({
		appId: applicationId,
		location: location,
		dependencies: JSON.stringify(dependencies),
		runTime,
		url,
		version,
		viewportHeight,
		viewportWidth,
		loadOn: loadon
	})

	const ui = new UserAgentInfo({
		appId: applicationId,
		browser: JSON.stringify(browser),
		cpu: JSON.stringify(cpu),
		device: JSON.stringify(device),
		engine: JSON.stringify(engine),
		os: JSON.stringify(os),
		ua
	})

	// 以下是统计浏览器使用率或浏览器出错比例
	const writeFileHandle = err => {
		if (err) console.log(err)
	}

	const readFileHandle = (err, data) => {
		if (err) {
			console.log(err)
		} else {
			const str = `${data}\n${applicationId} ${browser.name}-${browser.major} 1`
			fs.writeFile(__dirname + '/browser.txt', str, 'utf8', writeFileHandle)
		}
	}

	fs.readFile(__dirname + '/browser.txt', 'utf8', readFileHandle)

	// 以下用来统计每日js 和 ajax错误的数量
	const staWriteHandle = err => err && console.log(err)
	const staReadHandle = (err, data) => {
		if (err) {
			console.log(err)
		} else {
			const str = `${data}\n${applicationId} ${new Date().getMonth() + 1}/${new Date().getDate()} ${errorType === 'ajax@error' ? 'ajax' : 'js'}`
			fs.writeFile(`${__dirname}/statistic.txt`, str, 'utf8', staWriteHandle)
		}
	}

	fs.readFile(`${__dirname}/statistic.txt`, 'utf8', staReadHandle)

	// 以下用来存入错误
	Promise.all([en.save(), ui.save(), App.findOne({_id: applicationId})])
		.then(data => {
			const er = new Error({
				errorType,
				lineNumber,
				columnNumber,
				fileName,
				message,
				stack,
				environment: data[0]._id,
				user: currentUser,
				userAgentInfo: data[1]._id,
				time,
				appId: applicationId,
				appOwner: data[2].creator,
				logger: JSON.stringify(logger)
			})

			const handleSuccess = data => console.log(data)
			const handError = err => console.log(err)

			er.save()
			.then(handleSuccess)
			.catch(handError)
		})
		.catch(err => {
			console.log(err)
		})

	res.status(200).send('error reveived thank you for your use of eTrack.js')
}