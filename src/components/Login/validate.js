import { postJSON, checkHttpStatus, parseJSON } from '../../utils'

function validateUserName(name) {
	if (name === '') return '用户名不能为空'
	if (name.length < 3 || name.length > 20) return '用户名字符需在3到20之间'
	if (!(/[\w\u4E00-\u9FFF]+/.test(name))) return '用户名仅由字母数字下划线或汉字组成'
	return ''
}

function validateEmail(email) {
	const EMAIL_REG = /^\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\.(?!-)))+[a-z]{2,4}$/
	if (!(EMAIL_REG.test(email))) return '邮箱地址不合法'
	return ''
}

function validatePassword(password) {
	if (!(/\w/.test(password))) return '密码仅由字母数字和下划线组成'
	if ((/\s/.test(password))) return '密码不能有空字符'
	if (password.length < 6 || password.length > 30) return '密码长度需在6到30个字符'
	return ''
}

function validate(type, value) {
	switch (type) {
		case 'userName': return validateUserName(value)
		case 'email': return validateEmail(value)
		case 'password': return validatePassword(value)
	}
}

function canISignupOrLogin(panel, state) {
	switch (panel) {
		case 'login': return state.emailErrorText === '' && state.passwordErrorText === ''
		case 'signup': return state.userNameErrorText === '' && state.emailErrorText === '' && state.passwordErrorText === ''
		default: return false
	}
}

const signup = payload => {
	const url = '/api/user/createUser'
	return new Promise((resolve, reject) => {
		postJSON(url, payload)
		.then(checkHttpStatus)
		.then(parseJSON)
		.then(resolve)
		.catch(reject)
	})
}

export {
	validateUserName,
	validateEmail,
	validatePassword,
	validate,
	canISignupOrLogin,
	signup
}
