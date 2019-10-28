let Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/assets/')
    .setPublicPath('/assets')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(false)

    .addEntry('app', './assets/js/app.js')

    // Babel
    .configureBabel(function(babelConfig) {
        babelConfig.plugins.push('syntax-object-rest-spread');
        babelConfig.plugins.push('transform-object-rest-spread');
    })

    // Loaders
    .addLoader({
        test: /\.(js)$/,
        exclude: /node_modules\/(?!(bootstrap)\/).*/,
        loader: 'babel-loader',
        query: {
            presets: ['@babel/preset-env'],
        },
    })
    .enableSassLoader()
;

const config = Encore.getWebpackConfig();

config.watchOptions = {
    poll: true,
    ignored: /node_modules/,
};

module.exports = config;
