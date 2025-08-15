require('dotenv').config()

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    user: './simulations/user.test.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].test.js',
  },
  module: {
    rules: [
        { 
            test: /\.js$/, 
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: 3,
                        },
                        ],
                    ],
                sourceType: 'module',
                },
            }
        }   ],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};