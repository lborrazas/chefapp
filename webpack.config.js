// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let path =require('path')

module.exports = {
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js',
        }
    },
    entry: './resources/js/app.js',
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: 'output.js',
        publicPath: "./www"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]
}