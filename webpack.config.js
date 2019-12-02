const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {   
        viewer: __dirname + "/js/viewer/Main.js",
        //worker: __dirname + "/js/viewer/lib/pdf.worker.js",
    },
    
    output: {
        path: __dirname + '/www/js/',
        filename: '[name].bundle.js'
    },

    target : 'node',
    module: {
        rules: [
        {}
        ],
    },

    resolve: {
        modules: [
            path.resolve(__dirname)
        ],
        //root: path.resolve(__dirname),
        alias: {
            "jquery" : "js/viewer/lib/jquery", 
            "jquery-ui": "js/viewer/lib/jquery-ui-bundle", 
        },
        extensions: ['.js']
    },

    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        })
    ]
};
