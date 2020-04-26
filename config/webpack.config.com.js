const APP_ROOT = process.cwd(); // 当前项目的根目录
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝静态资源

const ENV_IS_DEV = process.env.NODE_ENV === 'development';// 开发模式

module.exports = {
	mode: "development",
	entry: {
		main: path.resolve(APP_ROOT, "./src/main.js")
	},
	output: {
		path: path.resolve(APP_ROOT, "./dist"),
		filename: "js/[name].[hash:8].js", // 导出的文件名
		chunkFilename: "js/[name].[hash:8].js", // 异步加载模块打包的文件名
		publicPath: '/'
	},
	resolve: {
		// webpack 查找模块的规则
		alias: {

		},
		modules: [path.resolve(APP_ROOT, "src"), "node_modules"], // 第三方模块查找顺序
		extensions: [".vue", ".js", ".json", ".less", ".css"] // 自动添加扩展名进行顺序查找
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-syntax-dynamic-import"],
							cacheDirectory: true // 采用缓存
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.(js)$/,
				loader: "eslint-loader",
				enforce: "pre",
				include: [path.resolve(APP_ROOT, "src")],
				options: {
					formatter: require("eslint-friendly-formatter")
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: ENV_IS_DEV
							? "vue-style-loader"
							: MiniCssExtractPlugin.loader,
						options: {
							hmr: ENV_IS_DEV // 是否热更新
						}
					},
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: ENV_IS_DEV
							? "vue-style-loader"
							: MiniCssExtractPlugin.loader,
						options: {
							hmr: ENV_IS_DEV
						}
					},
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/i, // 图片文件
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10240,
							fallback: {
								loader: "file-loader",
								options: {
									name: "img/[name].[hash:8].[ext]"
								}
							}
						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10240,
							fallback: {
								loader: "file-loader",
								options: {
									name: "media/[name].[hash:8].[ext]"
								}
							}
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10240,
							fallback: {
								loader: "file-loader",
								options: {
									name: "fonts/[name].[hash:8].[ext]"
								}
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(APP_ROOT, "./static/index.html"),
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "../static"),
				to: path.resolve(__dirname, "../dist")
			}
		])
	]
};
