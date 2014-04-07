module.exports = {
	csslint: {
		options: {
			'overqualified-elements': false,
			'adjoining-classes': false,
			'unqualified-attributes': false,
			'compatible-vendor-prefixes': false,
			'floats': false,
			'duplicate-background-images': false,
			'box-sizing': false
		},
		theme: {
			src: ['assets/linker/styles/**/*.{less,sass,scss}']
		}
	},
};