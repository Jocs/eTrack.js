/**
 * create by Jocs 2016.04.22
 */
import userRouter from '../api/user'
import appRouter from '../api/applications'
import authRouter from '../auth'
import errorRouter from '../api/error'
import statisticRouter from '../api/statistic'
import browserRouter from '../api/browser'

const router = (app, rootPath) => {
	app.get('/', (req, res, err) => {
		res.sendFile(`${rootPath}/index.html`)
	})
	app.get('/download', (req, res) => {
		res.download(`${rootPath}/server/download/etrack.min.js`)
	})

	app.use('/auth', authRouter)
	app.use('/api/user', userRouter)
	app.use('/api/applications', appRouter)
	app.use('/api/error', errorRouter)
	app.use('/api/statistic', statisticRouter)
	app.use('/api/browser', browserRouter)

	app.route('/*')
	.get(function(req, res) {
		res.sendFile(`${rootPath}/index.html`)
	})
 }

 export default router

