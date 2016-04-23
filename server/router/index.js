/**
 * create by Jocs 2016.04.22
 */
import userRouter from '../api/user'
import appRouter from '../api/applications'

const router = (app, rootPath) => {
	app.get('/', (req, res, err) => {
		res.sendFile(`${rootPath}/index.html`)
	})

	app.use('/api/user', userRouter)
	app.use('/api/applications', appRouter)
 }

 export default router

