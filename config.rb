require 'compass/import-once/activate'
# Require any additional compass plugins here.

# define bourbon path, use a common library for preventing duplicates
add_import_path '/opt/rubies/2.0.0-p451/lib/ruby/gems/2.0.0/gems/bourbon-4.0.2/app/assets/stylesheets'

# Set this to the root of your project when deployed:
http_path = "build"
css_dir = "source/styles"
sass_dir = "source/styles"
images_dir = "source/images"
generated_images_dir = "build/images/"
javascripts_dir = "source/scripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
sass_options = {
	:sourcemap => true
}
enable_sourcemaps = true

# Workaround Compass bug
module Compass::SassExtensions::Functions::Sprites
    def sprite_path(map)
      Sass::Script::String.new(map.filename)
    end
    Sass::Script::Functions.declare :sprite_path, [:map]
end
