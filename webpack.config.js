var path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const excludedModules = /(node_modules|bower_components)/;
const localIdentName = '[name]-[local]-[hash:base64:8]';

let plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
]
module.exports = {
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist')
    },

    module: {
        rules: [
            // js loader
            {
                test: /\.js$/,
                exclude: excludedModules,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    },
                }],
            },
            // react .jsx loader
            {
                test: /\.jsx$/,
                exclude: excludedModules,
                use: [{
                        loader: 'react-hot-loader',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        },
                    }
                ]
            },

            // css loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            // Loaders for other file types can go here
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },

    plugins: plugins,

    watch: isDev,

    devtool: false,

    watchOptions: {
        aggregateTimeout: 100
    }
};
