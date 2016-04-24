export const validateAppName = name => {
	if (name === '') return '应用名称不能为空'
	if (/\s/.test(name)) return '应用名称中不能有空字符'
	return ''
}

export const validateAppUrl = url => {
	if (url === '') return '需要填写检测网站的URL'
	if (/\s/.test(url)) return '检测网站URL中不能有空字符'
	return ''
}

export const isValidate = state => state.appNameErrorText === '' && state.appUrlErrorText === ''
