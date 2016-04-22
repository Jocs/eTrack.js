/**
 * create by Jocs 2016.04.22
 */

const router = (app, rootPath) => {
	app.get('/', (req, res, err) => {
		res.sendFile(`${rootPath}/index.html`)
	})
 }

 export default router

