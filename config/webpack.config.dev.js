const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.com.js');
const WebpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = WebpackMerge(webpackConfig, {
	mode: "development",
	devtool: "cheap-module-eval-source-map",
	devServer: {
		port: 3000, // 端口
		hot: true, // 启动热更新
		contentBase: "./dist", // 目标文件
		stats: "errors-only", // 去除不必要的输出日志
		historyApiFallback: true // 找不到路由页面时就返回默认页面
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
});
