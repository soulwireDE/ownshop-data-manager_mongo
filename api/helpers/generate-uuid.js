const { v4: uuidv4 } = require('uuid');

module.exports = {
  friendlyName: 'Generate UUID',

  description: 'Generates a new UUID.',

  fn: function() {
    return uuidv4();
  }
};
