require('dotenv').config()

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    user: './simulations/user.test.js',
    user: './simulations/produtos.test.js',
    user: './simulations/clientes.test.js',
    user: './simulations/listProducts.test.js',
    user: './simulations/listaClientes.test.js'
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
            type: 'asset/resource',
        }   ],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};