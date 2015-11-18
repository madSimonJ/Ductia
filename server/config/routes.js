var apiRoutes = require('../routes/apiRoutes');
var staticContentRoutes = require('../routes/staticContentRoutes');
var routeResponses = require('../routes/routeResponses');

module.exports = function(app) {

  apiRoutes.ConfigureApiRoutes(app);
  staticContentRoutes.configureStaticContentRoutes(app);
  app.get('*', routeResponses.SendFileNotFoundResponse);
  
}
