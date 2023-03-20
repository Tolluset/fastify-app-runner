echo "wait db server"
dockerize -wait tcp://db:3306 -timeout 20s

echo "start node server"
ts-node-esm --experimentalSpecifierResolution node ./server.js
