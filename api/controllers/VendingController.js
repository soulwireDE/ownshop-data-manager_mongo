/**
 * VendingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // Create a new vending item and associate it with a shop
  create: async function (req, res) {
    try {
      const shopUuid = req.param('shopId');

      // Finde den Shop anhand der UUID
      const shop = await Shop.findOne({ uuid: shopUuid });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      const { name, price, amount, type, category, slot, zoneid } = req.body;

      const newVendingItem = await Vending.create({
        name: name,
        price: price,
        amount: amount,
        type: type,
        category: category,
        slot: slot,
        zoneid: zoneid,
        shop: shop.id
      }).fetch();

      return res.status(201).json(newVendingItem);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Fetch all vending items for a specific shop
  findByShop: async function (req, res) {
    try {
      // Extrahiere Shop-UUID aus der URL
      const shopUuid = req.param('shopId');

      // Finde den Shop anhand der UUID
      const shop = await Shop.findOne({ uuid: shopUuid });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      // Finde alle Vending-Items, die mit diesem Shop verknüpft sind
      const vendingItems = await Vending.find({ shop: shop.id });

      return res.status(200).json(vendingItems);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Update an existing vending item
  update: async function (req, res) {
    try {
      // Extrahiere Vending-Item-ID aus der URL
      const vendingItemId = req.param('id');

      // Aktualisiere das Vending-Item mit den neuen Daten
      const updatedVendingItem = await Vending.updateOne({ id: vendingItemId })
        .set(req.body);

      if (!updatedVendingItem) {
        return res.status(404).json({ error: 'Vending item not found' });
      }

      return res.status(200).json(updatedVendingItem);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Delete a vending item
  delete: async function (req, res) {
    try {
      // Extrahiere Vending-Item-ID aus der URL
      const vendingItemId = req.param('id');

      // Lösche das Vending-Item
      const deletedVendingItem = await Vending.destroyOne({ id: vendingItemId });

      if (!deletedVendingItem) {
        return res.status(404).json({ error: 'Vending item not found' });
      }

      return res.status(200).json({ message: 'Vending item deleted successfully' });
    } catch (error) {
      return res.serverError(error);
    }
  }
};
