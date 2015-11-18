var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development:{
    rootPath: rootPath,
    db: 'mongodb://127.0.0.1/ductia',
    port: process.env.PORT || 8080,
    reseedDBOnServerRestart: true
  },
  production: {
    rootPath: rootPath,
    db: '',
    port: process.env.PORT || 80,
    reseedDBOnServerRestart: false
  }
}
