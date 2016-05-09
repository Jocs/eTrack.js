/**
 * create by Jocs 2016.0505
 */

import Statistic from './model'

export const getStatisticData = (req, res) => {
	const { appId } = req.params
	Statistic.findOne({appId})
		.then(data => {

			if (data === null) res.send({code: 2})
			else {
				const { errorPerDay } = data
				const totalDay = data.errorPerDay.length
				const total = data.errorPerDay.reduce((acc, item) => acc + item.js + item.ajax, 0)
				const yesterdayJs = totalDay >= 2 ? data.errorPerDay[totalDay - 2].js : 0
				const beforeYesterdayJs = totalDay >= 3 ? data.errorPerDay[totalDay - 3].js : 0
				const yesterdayJsCompare = beforeYesterdayJs === 0
					? null : (yesterdayJs - beforeYesterdayJs) / beforeYesterdayJs

				const yesterdayAjax = totalDay >= 2 ? data.errorPerDay[totalDay - 2].ajax : 0
				const beforeYesterdayAjax = totalDay >= 3 ? data.errorPerDay[totalDay - 3].ajax : 0
				const yesterdayAjaxCompare = beforeYesterdayAjax === 0
					? null : (yesterdayAjax - beforeYesterdayAjax) / beforeYesterdayAjax

				res.send({
					code: 1,
					total,
					totalDay,
					yesterdayJs,
					yesterdayJsCompare,
					yesterdayAjax,
					yesterdayAjaxCompare,
					errorPerDay
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.send({code: 0, err})
		})
}
