/**
 * create by Jocs 2016.04.22
 */
import userRouter from '../api/user'
import appRouter from '../api/applications'
import authRouter from '../auth'

const router = (app, rootPath) => {
	app.get('/', (req, res, err) => {
		res.sendFile(`${rootPath}/index.html`)
	})

	app.use('/auth', authRouter)
	app.use('/api/user', userRouter)
	app.use('/api/applications', appRouter)
	app.route('/*')
	.get(function(req, res) {
		res.sendFile(`${rootPath}/index.html`)
	})
 }

 export default router

