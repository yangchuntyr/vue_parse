
const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
 
    entry:{
        index:'./src/index.js'
    }
   
    ,    output: {
        path: path.resolve(__dirname, 'dist'),//这里一定要说绝对路径
        filename: '[name].js',
      
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins:[

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true  
        })
    ],
    devServer:{
        compress: true,
        port: 8084   
    }
};