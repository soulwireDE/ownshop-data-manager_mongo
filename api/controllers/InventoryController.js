/**
 * InventoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    const uuid = await sails.helpers.generateUuid();
    try {

      const shopId = req.param('shopId');
      const shop = await Shop.findOne({ uuid: shopId });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      const shopObjectId = shop.id;
      const { name, items } = req.body;

      const newInventory = await Inventory.create({
        name: name,
        items: items,
        shop: shopObjectId,
        uuid: uuid
      }).fetch();

      return res.status(201).json(newInventory);
    } catch (error) {
      return res.serverError(error);
    }
  },
  read: async function (req, res) {
    try {
      const inventory = await Inventory.findOne({ uuid: req.params.id});
      if (!inventory) {return res.notFound();}
      return res.json(inventory);
    } catch (err) {
      return res.serverError(err);
    }
  },
  readByShopId: async function (req, res) {
    try {

      const shop = await Shop.find({ uuid: req.params.shopUuid }).limit(1);
      if (!shop) {return res.notFound({ message: 'Shop not found ' + req.params.shopUuid });}
      const inventories = await Inventory.find({ shop: shop._id });
      if (inventories.length === 0) return res.notFound({ message: "No inventories found" });


      return res.json(inventories);  // Rückgabe der Liste der Inventories
    } catch (err) {
      return res.serverError(err);
    }
  },
  update: async function (req, res) {
    try {
      const updatedInventory = await Inventory.updateOne({ id: req.params.id, shop: req.params.shopId }).set(req.body);
      if (!updatedInventory) {return res.notFound();}
      return res.json(updatedInventory);
    } catch (err) {
      return res.serverError(err);
    }
  },
  delete: async function (req, res) {
    try {
      const deletedInventory = await Inventory.destroyOne({ id: req.params.id, shop: req.params.shopId });
      if (!deletedInventory) {return res.notFound();}
      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  }
};
