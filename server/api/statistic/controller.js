/**
 * create by Jocs 2016.0505
 */

import Statistic from './model'

export const getStatisticData = (req, res) => {
	const { appId } = req.params
	Statistic.findOne({appId})
		.then(data => {
			const { errorPerDay } = data
			const totalDay = data.errorPerDay.length
			const yesterdayJs = data.errorPerDay[totalDay - 2].js
			const beforeYesterdayJs = data.errorPerDay[totalDay - 3].js
			const yesterdayJsCompare = beforeYesterdayJs === 0
				? null : (yesterdayJs - beforeYesterdayJs) / beforeYesterdayJs

			const yesterdayAjax = data.errorPerDay[totalDay - 2].ajax
			const beforeYesterdayAjax = data.errorPerDay[totalDay - 3].ajax
			const yesterdayAjaxCompare = beforeYesterdayAjax === 0
				? null : (yesterdayAjax - beforeYesterdayAjax) / beforeYesterdayAjax
			if (data === null) res.send({code: 2})
			else {
				res.send({
					code: 1,
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
			res.send({code: 0, err})
		})
}