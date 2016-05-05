/**
 * create by Jocs 2016.05.05
 */

import Browser from './model'

export const browserPercentage = (req, res) => {
	const { appId } = req.params
	Browser.findOne({appId})
		.then(data => {
			if (data === null) res.send({code: 2})
			else {
				const { browsers } = data
				res.send({code: 1, browsers})
			}
		})
		.catch(err => {
			res.send({code: 0, err})
		})
}
