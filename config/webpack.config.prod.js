const path = require('path');
const webpackConfig = require('./webpack.config.com.js');
const WebpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = WebpackMerge(webpackConfig, {
	mode: "production",
	devtool: "cheap-module-source-map",
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[hash].css",
			chunkFilename: "css/[id].[hash].css"
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				// 压缩js
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCssAssetsPlugin({})
		],
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				libs: {
					name: "chunk-libs",
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					chunks: "initial" // 只打包初始时依赖的第三方
				}
			}
		}
	},
	// 警告 webpack 的性能提示
	performance: {
		hints: "warning",
		// 入口起点的最大体积
		maxEntrypointSize: 50000000,
		// 生成文件的最大体积
		maxAssetSize: 30000000,
		// 只给出 js 文件的性能提示
		assetFilter: function(assetFilename) {
			return assetFilename.endsWith('.js');
		}
	}
});
