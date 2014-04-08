cd `dirname $0`

npm cache clean
npm install
npm update

bower cache clean
bower install
bower update