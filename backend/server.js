const HTTP = require('http');
const port = process.env.PORT || 3000
const app = require('./app')

const server = HTTP.createServer(app)
server.listen(port)