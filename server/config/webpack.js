import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfigration from '../../webpack/common.config'

const compiler = webpack(webpackConfigration)

const webpackInit = app => {
	if (process.env.NODE_ENV !== 'development') return false
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfigration.output.publicPath
	}))
	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}))

}

export default webpackInit
