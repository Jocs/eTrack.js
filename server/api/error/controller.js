/**
 * create by Jocs 2016.04.28
 */
import Error from './model'
import Environment from '../environment/model'
import UserAgentInfo from '../userAgentInfo/model'

export const receiveFault = (req, res) => {
	res.status(200).send('fault received thank you!')
}

export const receiveError = (req, res) => {
	// console.log(req.body)
	const { applicationId } = req.body
	const {
		location,
		dependencies,
		loadon,
		runTime,
		url,
		version,
		viewportHeight,
		viewportWidth
	} = req.body.environment

	const { browser, cpu, device, engine, os, ua } = req.body.environment.userAgentInfo

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
		browser: JSON.stringify(browser),
		cpu: JSON.stringify(cpu),
		device: JSON.stringify(device),
		engine: JSON.stringify(engine),
		os: JSON.stringify(os),
		ua
	})

	en.save()
	.then(data => console.log(data))
	.catch(err => console.log(err))

	ui.save()
	.then(data => console.log(data))
	.catch(err => console.log(err))

	res.status(200).send('error reveived thank you for your use of eTrack.js')
}
