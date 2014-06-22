cd `dirname $0`

git config core.ignorecase false

gem update --system
gem install bundler
bundle install

npm install -g n
npm cache clean
npm install
npm update

n 0.11.13

bower cache clean
bower install
bower update
