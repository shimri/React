import path from 'path'
import webpack from 'webpack'
 export default {
   devtools: 'eval-source-map',
   entry: [
     'webpack-hot-middleware/client',
     path.join(__dirname, '/client/index.js')
   ],
   output: {
     path: __dirname,
     filename: 'bundle.js',
     publicPath: '/'
   },
   plugins:[
     new webpack.NoErrorsPlugin(),
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.HotModuleReplacementPlugin()
   ],
   module: {
     loaders: [
       {
         test: /\.js$/,
         include: [
                  path.join(__dirname, 'client'),
                  path.join(__dirname, 'server/shared')
                  ],
         loaders: [ 'react-hot','babel']
       },
       {
          test: /\.json$/,
          loader: 'json-loader'
       }
     ]
   },
   resolve: {
     extentions: [ '', '.js' ]
   },
   node:{
     dns:'empty',
     net:'empty'
   }
 }
