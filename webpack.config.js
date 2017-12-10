var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('js/docs', './assets/js/docs.js')
    .addStyleEntry('css/docs', './assets/scss/docs.scss')

    // uncomment if you use Sass/SCSS files
    .enableSassLoader(function(options) {
        // https://github.com/sass/node-sass#options
        options.includePaths = ['assets/bower_components/foundation-sites/scss/']
    })

    .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
