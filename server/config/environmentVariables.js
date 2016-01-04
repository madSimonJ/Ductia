var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
console.log('port =' + process.env.PORT);
module.exports = {
  development:{
    rootPath: rootPath,
    db: 'mongodb://127.0.0.1/ductia',
    port: process.env.PORT || 8080,
    reseedDBOnServerRestart: true
  }, test: {
    rootPath: rootPath,
    db: 'test',
    port: process.env.PORT || 8080,
    reseedDBOnServerRestart: false
  }, production: {
    rootPath: rootPath,
    db: 'production',
    port: process.env.PORT || 80,
    reseedDBOnServerRestart: false
  }
}
