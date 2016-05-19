/**
 * create by Jocs 2016.05.19
 */

import 'isomorphic-fetch'

export const getLocation = (req, res) => {
	const { ip } = req.body
	const url = `http://api.map.baidu.com/location/ip?ak=gYiXlz4HuBXrnPvime2F2Gq8&ip=${ip}&coor=bd09ll`
	fetch(url)
	.then(response => {
		if (response.status >= 400) {
			Promise.reject('ip地址获取地址详情失败')
		} else {
			return response.json()
		}
	})
	.then(response => {
		res.send(response)
	})
	.catch(err => {
		res.status(400).send({message: err})
	})
}
