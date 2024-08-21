/**
 * InventoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const shop = req.params.shopId;
      const inventory = await Inventory.create({ ...req.body, shop }).fetch();
      return res.json(inventory);
    } catch (err) {
      return res.serverError(err);
    }
  },
  read: async function (req, res) {
    try {
      const inventory = await Inventory.findOne({ id: req.params.id, shop: req.params.shopId });
      if (!inventory) return res.notFound();
      return res.json(inventory);
    } catch (err) {
      return res.serverError(err);
    }
  },
  update: async function (req, res) {
    try {
      const updatedInventory = await Inventory.updateOne({ id: req.params.id, shop: req.params.shopId }).set(req.body);
      if (!updatedInventory) return res.notFound();
      return res.json(updatedInventory);
    } catch (err) {
      return res.serverError(err);
    }
  },
  delete: async function (req, res) {
    try {
      const deletedInventory = await Inventory.destroyOne({ id: req.params.id, shop: req.params.shopId });
      if (!deletedInventory) return res.notFound();
      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  }
};
