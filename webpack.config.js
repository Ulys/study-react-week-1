
// module.exports = {
// 	context: __dirname + '/src',
// 	entry: {
// 		javascript: './js/GameInterface.js',
// 		html: './index.html'
// 	},

// 	output: {
// 		filename: 'Game.js',
// 		path: __dirname + '/dist'
// 	},

// 	module: {
// 		loaders: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loaders: 'babel',
// 				query: {
// 					presets: ['react']
// 				}
// 			},
// 			{
// 				test: /\.html$/,
// 				loader: "file?name=index.html"
// 			}
// 		]
// 	}
// }

var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'src/js');
var dir_html = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'dist');

module.exports = {
    entry: path.resolve(dir_js, 'GameInterface.js'),
    output: {
        path: dir_build,
        filename: 'Game.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'react-hot',
                test: dir_js,
            },
            {
                loader: 'babel-loader',
                test: dir_js,
                query: {
                    presets: ['es2015', 'react'],
                },
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};