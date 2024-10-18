/**
 * ShopController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const uuid = await sails.helpers.generateUuid();
      const bodyData = req.body;
      bodyData.uuid = uuid;
      bodyData.updatedAt = Date.now();
      bodyData.createdAt = Date.now();

      const shop = await Shop.create(req.body).fetch();

      const newStats = await Stats.create({
        shop: shop.id,
        visitors: 0,
        purchases: 0,
        bought: 0,
        sold: 0,
        cashposition: 0,
        transactions: 0
      }).fetch();

      return res.json(shop);
    } catch (err) {
      return res.serverError(err);
    }
  },
  read: async function (req, res) {
    try {
      const shop = await Shop.findOne({ uuid: req.params.id })
      .populate('stats')
      .populate('inventory')
      .populate('vending');
      if (!shop) return res.notFound();
      return res.json(shop);
    } catch (err) {
      return res.serverError(err);
    }
  },
  update: async function (req, res) {
    try {
      const updatedShop = await Shop.updateOne({ uuid: req.params.id }).set(req.body);
      if (!updatedShop) return res.notFound();
      return res.json(updatedShop);
    } catch (err) {
      return res.serverError(err);
    }
  },
  delete: async function (req, res) {
    try {
      const deletedShop = await Shop.destroyOne({ uuid: req.params.id });
      if (!deletedShop) return res.notFound();
      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  },
  find: async function (req, res) {
    try {
      const shops = await Shop.find();
      return res.json(shops);
    } catch (err) {
      return res.serverError(err);
    }
  },
  patch: async function (req, res) {
    try {
      const shopId = req.params.id;
      const updateData = req.body;

      // if id send delete it
      delete updateData.id;
      updateData.updatedAt = Date.now();

      if (Object.keys(updateData).length === 0) {
        return res.badRequest({ message: 'No update data provided' });
      }

      // Finde das Shop-Modell, das aktualisiert werden soll
      const shop = await Shop.findOne({ uuid: shopId });
      if (!shop) return res.notFound({ message: 'Shop not found' });

      const updatedShop = await Shop.updateOne({ uuid: shopId }).set(updateData);

      if (!updatedShop) return res.notFound({ message: 'Shop not updated' });

      return res.json(updatedShop);
    } catch (err) {
      return res.serverError(err);
    }
  },
  coords: async function (req, res) {
    try {
      // Fetch all shops with their zones
      const shops = await Shop.find().select(['id', 'zone']);

      // Extract and return only the zone data
      const allZones = shops.map(shop => ({
        id: shop.id,
        zone: shop.zone
      }));

      return res.json(allZones);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Get specific zone type from a shop by shop ID
  getZoneByType: async function (req, res) {
    try {
      const shopId = req.params.id;
      const zoneType = req.params.zoneType;

      // Fetch the shop with the specific ID
      const shop = await Shop.findOne({ id: shopId });
      if (!shop) return res.notFound({ message: 'Shop not found' });

      // Check if the requested zone type exists
      if (!shop.zone || !shop.zone[zoneType]) {
        return res.notFound({ message: `Zone type '${zoneType}' not found in this shop` });
      }

      // Return the specific zone data
      return res.json(shop.zone[zoneType]);
    } catch (err) {
      return res.serverError(err);
    }
  },

  getCoordsByZoneType: async function (req, res) {
    try {
      const zoneType = req.params.zoneType;

      // Fetch all shops
      const shops = await Shop.find().select(['id', 'zone']);

      // Collect coordinates for the specified zone type across all shops
      const coords = shops.map(shop => {
        if (shop.zone && shop.zone[zoneType]) {
          return {
            shopId: shop.id,
            zoneType: zoneType,
            coords: shop.zone[zoneType].points
          };
        }
      }).filter(Boolean);  // Remove undefined entries if a zoneType does not exist in some shops

      // If no coordinates found, return a not found response
      if (!coords.length) {
        return res.notFound({ message: `No coordinates found for zone type '${zoneType}'` });
      }

      return res.json(coords);
    } catch (err) {
      return res.serverError(err);
    }
  },


};

