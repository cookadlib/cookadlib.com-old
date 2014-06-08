/**
 * HTML minification
 */
module.exports = {

    default: {

        options: {
            /*removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            //collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true*/
        },

        files: [
            {
                expand: true,
                cwd: '<%= package.config.path.source %>',
                src: ['**/*.{gif,jpg,jpeg,png}'],
                dest: '<%= package.config.path.build %>'
            }
        ]

    }

};
