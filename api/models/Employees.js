/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    Name: { type: 'string', required: true },
    grade: { type: 'number', required: true },
    empUser: { type: 'string', required: true },
    passwd: { type: 'string', required: true },
    isBoss: { type: 'boolean', defaultsTo: false },
    payment: { type: 'number', required: true },
    reward: { type: 'number', required: true },
    meta: { type: 'json', defaultsTo: {} },
    shop: { model: 'shop', required: true } // Beziehung zu Shop
  }
};

