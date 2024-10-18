/**
 * Shop.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    label: { type: 'string', required: true },
    description: { type: 'string' },
    uuid: { type: 'string', unique: true, required: true },
    ped: { type: 'string' },
    scenario: { type: 'string' },
    radius: { type: 'number' },
    targetIcon: { type: 'string' },
    targetLabel: { type: 'string' },
    showblip: { type: 'boolean' },
    blipsprite: { type: 'number' },
    blipscale: { type: 'number' },
    blipcolor: { type: 'number' },
    BossId: { type: 'string' },
    Url: { type: 'string', isURL: true },
    canUseFor: { type: 'json', columnType: 'array' },
    zone: { type: 'json' }, // Zonen-Informationen
    inventory: { collection: 'inventory', via: 'shop' },
    vending: { collection: 'vending', via: 'shop' },
    stats: { model: 'stats' },
    employees: {
      collection: 'employees',
      via: 'shop'
    },
  }
};


