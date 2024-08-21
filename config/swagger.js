module.exports.swagger = {
  /**
   * Swagger Info Object
   * @type {Object}
   */
  pkg: {
    name: 'Shop API',
    version: '1.0.0',
    description: 'API Documentation for the Shop system',
  },

  /**
   * Array of folders to ignore
   * @type {Array}
   */
  hideDirectories: ['/node_modules', '/assets'],

  /**
   * Swagger host
   * @type {String}
   */
  host: 'localhost:1337',

  /**
   * Swagger schemes
   * @type {Array}
   */
  schemes: ['http'],

  /**
   * Toggle whether to expose models with schemas
   * @type {Boolean}
   */
  includeModelSchemas: true,

  /**
   * Swagger Security Definitions Object
   * @type {Object}
   */
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },

  /**
   * Default Response Messages for API
   * @type {Array}
   */
  defaults: {
    responses: {
      '200': {
        description: 'The request was successful',
      },
      '400': {
        description: 'Bad Request',
      },
      '404': {
        description: 'Not Found',
      },
      '500': {
        description: 'Internal Server Error',
      },
    },
  },
};
