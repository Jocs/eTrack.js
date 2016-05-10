/**
 * create by Jocs 2016.04.23
 */
import mongoose from 'mongoose'

const mongooseInit = () => {
	let host = ''
	let username = ''
	let password = ''
	let database = ''
	let port = ''
	let url = ''
	if (process.env.SERVER_SOFTWARE === 'bae/3') {
		host = 'mongo.duapp.com'
		username = '78b39e5c37054e82865b9d2bda504946'
		password = 'd61d4f7285e44b7083000c287f65074f'
		database = 'NVBAWbZYrvNwgaCrArFI'
		port = 8908
		url = `mongodb://${username}:${password}@${host}:${port}/${database}`
	} else {
		host = '127.0.0.1'
		database = 'eTrack'
		port = 12345
		url = 'mongodb://127.0.0.1:12345/eTrack'
	}

	const option = {
		db: {native_parser: true},
		server: { poolSize: 5, auto_reconnect: true },
		user: username,
		pass: password
	}

	mongoose.connect(url, option)

	const db = mongoose.connection
	db.on('error', err => console.error(`connect error: ${err}`))
	db.on('open', () => console.log(`mongodb database open at ${url}`))

	// 控制台配置mongo命令：
	// bin/mongod -f conf/mongod.conf
	// 控制台启动mongo
	// bin/mongo 127.0.0.1:12345

}

export default mongooseInit

