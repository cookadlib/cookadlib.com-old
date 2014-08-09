cd `dirname $0`

#npm start
n use 0.11.13 --harmony app.js &
mongod --dbpath ./data/db/ &
mongo &
