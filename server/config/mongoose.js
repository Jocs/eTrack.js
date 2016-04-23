/**
 * create by Jocs 2016.04.23
 */
import mongoose from 'mongoose'

const mongooseInit = () => {

	const mongoUri = process.env.NODE_ENV === 'development' ? 'mongodb://127.0.0.1:12345/eTrack' : ''
	mongoose.connect(mongoUri)

	const db = mongoose.connection
	db.on('error', err => console.error(`connect error: ${err}`))
	db.on('open', () => console.log(`mongodb database open at ${mongoUri}`))

	// 控制台配置mongo命令：
	// bin/mongod -f conf/mongod.conf
	// 控制台启动mongo
	// bin/mongo 127.0.0.1:12345

}

export default mongooseInit

