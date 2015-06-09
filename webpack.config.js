var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        flight: './js/app.js'
    },
    output: {
        path: './',
        filename: "/build/js/dint.js"
    },
    module: {
        loaders: [{
            test: /\.hbs$/, 
            loader: 'handlebars-loader', 
            query: {
                helperDirs: [
                    path.resolve('/js/helpers')
                ]
            }
        }, {
            //tell webpack to use jsx-loader for all *.jsx files
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony'
        }]
    },
    resolveLoader: {                                                                                
        root: path.join(__dirname, 'node_modules')                                                  
    }, 
    resolve: {
        root: './',
        alias: {
            _: 'js/libraries/underscore',
            jquery: 'js/libraries/jquery',
            underscore: 'js/libraries/underscore',
            backbone: 'js/libraries/backbone',
            velocity:'js/libraries/velocity'
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [ 
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'underscore',
                Backbone: 'backbone'
        }) 
    ]
};