module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	outputDir: 'dist',
	publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
	productionSourceMap: false,
	devServer: {
		host: '0.0.0.0',
		open: true,
		proxy: {
			'/api/v1': {
				target: 'http://localhost:6001',
				changeOrigin: true,
			}
		}
	}
}
