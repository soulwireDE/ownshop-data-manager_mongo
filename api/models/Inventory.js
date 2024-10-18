/**
 * Inventory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    name: { type: 'string', required: true },
    items: {
      type: 'json',  // Hier wird die verschachtelte Struktur für Artikel gespeichert
      columnType: 'object',  // Die Art von Daten, die gespeichert werden (Objekte)
      required: true
    },

    // Referenz auf den zugehörigen Shop
    shop: { model: 'shop' },
    uuid: { type: 'string', unique: true, required: true },
  }
};


