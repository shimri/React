import express from 'express'
import path from 'path'

//Webpack
import webpack from 'webpack'
import webpackMiddleweare from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.dev.js'
import webpackHotMiddleware from 'webpack-hot-middleware'
import bodyParser from 'body-parser'

import users from './routes/users'

const config = require('../config');

// connect to the database and load models
require('./models').connect(config.dbUri);

let app = express()

app.use(bodyParser.json())

app.use('/api/users',users)

const compiler = webpack(webpackConfig)
app.use(webpackMiddleweare(compiler,{
  hot:true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, './index.html'))
 })

app.listen(3000,()=> console.log('Running on localhost:3000'))
