const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger/swagger.json'); // Pfad zur generierten swagger.json Datei

module.exports = async function (req, res) {
  // Nutze Express-Middleware, um Swagger-UI bereitzustellen
  return swaggerUi.serve(req, res, () => {
    swaggerUi.setup(swaggerDocument)(req, res);
  });
};
