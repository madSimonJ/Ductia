var apiRoutes = require('../routes/apiRoutes');
var falcorRoutes = require('../routes/falcorRoutes');
var staticContentRoutes = require('../routes/staticContentRoutes');
var routeResponses = require('../routes/routeResponses');

module.exports = function(app) {

  apiRoutes.ConfigureApiRoutes(app);
  falcorRoutes.ConfigureFalcorRoutes(app);
  staticContentRoutes.configureStaticContentRoutes(app);
  app.get('*', routeResponses.SendFileNotFoundResponse);

}
