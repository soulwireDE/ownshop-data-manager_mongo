/**
 * Vending.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    amount: { type: 'number', required: true },
    type: { type: 'string' },
    category: { type: 'string' },
    slot: { type: 'number' },
    zoneid: { type: 'string' },
    shop: { model: 'shop' } // Referenz auf den Shop
  }
};


