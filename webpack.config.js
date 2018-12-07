const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
let root = path.resolve(__dirname, '.');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//打包块分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {VueLoaderPlugin} = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

let config = {
    //入口
    entry: {
        app: path.join(__dirname, 'src/app.js')
    },

    //出口
    output: {
        filename: "[name].[chunkhash:8].js",
        path: path.resolve(__dirname, 'dist')
    },

    //统计信息
    stats: {
        children: false
    },

    //loader
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader'
                }
            },
        ]
    },

    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.join(root, 'index.html'), // 模板文件
            inject: 'body' // js的script注入到body底部
        }),
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new SpeedMeasurePlugin()
    ],
};

//优化
let optimization = {
    minimizer: [new OptimizeCssAssetsPlugin()],
        runtimeChunk: {
        name: "manifest"
    },
    //提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
    splitChunks:{
        // 避免过度分割，设置尺寸不小于30kb
        //cacheGroups会继承这个值
        minSize:30000,
            cacheGroups:{
            //vue相关框架
            vue:{
                test: /[\\/]node_modules[\\/]vue[\\/]/,
                    name: 'chunk-vue',
                    // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    chunks:'all'
            },
            //elementUI相关框架
            element:{
                test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    name: 'chunk-elementUI',
                    // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    chunks:'all'
            },
            //mavon-editor相关框架
            mavon:{
                test: /[\\/]node_modules[\\/]mavon-editor[\\/]/,
                    name: 'chunk-mavon',
                    // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    chunks:'all'
            },
            //其他框架
            vendors:{
                test:/[\\/]node_modules[\\/]?!(vue)[\\/]/,
                    //拆分出来块的名字,默认是缓存组名称+"~" + [name].js
                    name: 'chunk-vendor',
                    chunks:'all'
            }
        }
    }
};

if (!isDev) {
    config.mode = 'production';

    config.module.rules.push(
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../'
                    }
                },
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        },
    );

    config.optimization = optimization;
    config.plugins.push(
        new UglifyJsPlugin({
            parallel: true,
            cache: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
    )
} else {
    config.mode = 'development';

    config.module.rules.push(
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        },
    );
}

module.exports = config;