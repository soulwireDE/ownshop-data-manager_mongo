/**
 * Stats.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    visitors: { type: 'number', defaultsTo: 0 },
    purchases: { type: 'number', defaultsTo: 0 },
    bought: { type: 'number', defaultsTo: 0 },
    sold: { type: 'number', defaultsTo: 0 },
    cashposition: { type: 'number', defaultsTo: 0 },
    transactions: { type: 'number', defaultsTo: 0 },
    shop: { model: 'shop' } // Referenz auf den Shop
  }
};


