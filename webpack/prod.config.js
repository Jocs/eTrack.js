const webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	output: {
		publicPath: 'dist/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},
			__DEVELOPMENT__: false
		}),
		new webpack.optimize.DedupePlugin(), // deduplicate them in the output, don't use it in production.
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}
