/**
 * create by Jocs 2016.05.14
 */
import App from '../applications/model'
export const validateError = (req, res, next) => {
	const { applicationId } = req.body
	App.findById(applicationId)
	.then(app => {
		if (app === null) return res.send({code: 2, error: `${applicationId}不正确，请使用正确的appId`})
		next()
	})
	.catch(err => {
		console.log(err)
		res.send({code: 0, error: '查询app失败！'})
	})
}
