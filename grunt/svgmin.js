/**
 * Image minification
 */
module.exports = {

	options: {
		plugins: [
			{
				removeViewBox: false // don't remove the viewbox atribute from the SVG
			},
			{
				removeUselessStrokeAndFill: false // don't remove Useless Strokes and Fills
			},
			{
				removeEmptyAttrs: false // don't remove Empty Attributes from the SVG
			},
			{
				convertPathData: {
					straightCurves: false // advanced SVGO plugin option
				}
			},
			{
				mergePaths: false
			}
		]
	},

	default: {
		files: [
			{
				expand: true,
				cwd: '<%= package.config.path.source %>/images',
				src: [ '**/*.svg' ],
				dest: '<%= package.config.path.build %>/images'
			}
		]
	}

};
