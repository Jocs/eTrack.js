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
			const str = `${data}\n${applicationId} ${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} ${errorType === 'ajax@error' ? 'ajax' : 'js'}`
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

export const getError = (req, res) => {
	const { appId, pageNumber, pageSize } = req.params
	Error.find({appId})
		.sort({'time': -1})
		.skip((Number(pageNumber) - 1) * Number(pageSize))
		.limit(Number(pageSize))
		.populate({
			path: 'environment',
			select: 'url'
		})
		.populate({
			path: 'userAgentInfo',
			select: 'browser'
		})
		.select('environment userAgentInfo message errorType time user')
		.then(data => {
			res.send({code: 1, data})
		})
		.catch(err => {
			res.send({code: 0, err})
		})
}

export const singleError = (req, res) => {
	const { errorId } = req.params
	Error.findById(errorId)
		.populate('environment')
		.populate('userAgentInfo')
		.then(data => {
			res.send({code: 1, data})
		})
		.catch(err => {
			res.send({code: 0, err})
		})
}

export const errorsWithLocation = (req, res) => {
	const { appId } = req.params
	Error.find({appId})
		.sort({'time': -1})
		.limit(100)
		.populate({
			path: 'environment',
			select: 'location'
		})
		.select('environment message errorType time user')
		.then(data => {
			const filterData = data.filter(d => d.environment.location)
			res.send({code: 1, data: filterData})
		})
		.catch(err => {
			res.send({code: 0, err})
		})
}

export const simpleSearch = (req, res) => {
	const { appId, pageNumber, pageSize, message } = req.params
	Error
	.find({appId})
	.sort({'time': -1})
	.where({'message': {$regex: new RegExp(message, 'i')}})
	.skip((Number(pageNumber) - 1) * Number(pageSize))
	.limit(Number(pageSize))
	.populate({
		path: 'environment',
		select: 'url'
	})
	.populate({
		path: 'userAgentInfo',
		select: 'browser'
	})
	.select('environment userAgentInfo message errorType time user')
	.then(data => {
		return Error.find({appId}).count({'message': {$regex: new RegExp(message, 'i')}})
		.then(total => {
			console.log(total)
			res.send({code: 1, data, pageSize, pageNumber, total: Math.ceil(total / pageSize)})
		})
	})
	.catch(err => {
		res.send({code: 0, err})
	})
}

export const complexSearch = (req, res) => {
	const {
		appId,
		pageNumber,
		pageSize,
		include,
		errorType,
		startTime,
		endTime,
		browser,
		user
	} = req.params


	const IN_REGEXP = include !== '' ? new RegExp(include, 'i') : new RegExp(/.*/, 'i')
	const USER_REGEXP = user !== '' ? new RegExp(user, 'i') : new RegExp(/.*/, 'i')
	const Error_TYPE_REGEXP = errorType === 'all' ? new RegExp(/.*/, 'i') : errorType === 'ajax' ? new RegExp('ajax', 'i') : new RegExp('^((?!ajax).)*$', 'i')
	const start = new Date(Number(startTime))
	const end = new Date(Number(endTime))
	const BROWSER_REGEXP = browser === 'all' ? new RegExp(/.*/, 'i') : new RegExp(browser, 'i')

	const getSpecialData = () => {
		return 	Error
		.find({appId})
		.where({message: {$regex: IN_REGEXP}})
		.where({errorType: {$regex: Error_TYPE_REGEXP}})
		.where({createdAt: {$gt: start, $lt: end}})
		.where({user: {$regex: USER_REGEXP}})
		.populate({
			path: 'userAgentInfo',
			select: 'browser',
			match: {browser: new RegExp(BROWSER_REGEXP, 'i')}
		})
	}

	getSpecialData()
	.skip((Number(pageNumber) - 1) * Number(pageSize))
	.limit(Number(pageSize))
	.populate({
		path: 'environment',
		select: 'url'
	})
	.select('environment userAgentInfo message errorType time user')
	.then(data => {
		getSpecialData()
		.count()
		.then(total => {
			console.log(total, 'total')
			res.send({code: 1, data, total: Math.ceil(total / pageSize), pageSize, pageNumber})
		})
	})
	.catch(err => {
		res.send({code: 0, err})
	})
}
