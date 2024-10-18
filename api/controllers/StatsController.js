// api/controllers/StatsController.js

module.exports = {
  // Erstelle eine neue Stats-Instanz
  create: async function (req, res) {
    try {
      const { shopId } = req.params; // shopId von der URL
      const { visitors, purchases, bought, sold, cashposition, transactions } = req.body;

      const shop = await Shop.findOne({ uuid: shopId });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      const shopObjectId = shop.id;
      // Erstelle den Stats-Datensatz
      const stats = await Stats.create({
        shop: shopObjectId,
        visitors,
        purchases,
        bought,
        sold,
        cashposition,
        transactions
      }).fetch();

      return res.ok(stats);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Lese Stats für einen bestimmten Shop
  read: async function (req, res) {
    try {
      const { shopId } = req.params;

      const shop = await Shop.findOne({ uuid: shopId });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      const shopObjectId = shop.id;
      const stats = await Stats.findOne({ shop: shopObjectId });

      // Überprüfe, ob Stats existieren
      if (!stats) {
        return res.notFound({ error: 'Stats nicht gefunden für diesen Shop' });
      }

      return res.ok(stats);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Aktualisiere Stats für einen bestimmten Shop
  update: async function (req, res) {
    try {
      const { shopId } = req.params; // Shop-UUID aus den URL-Parametern
      const updates = req.body; // Die neuen Werte aus der Anfrage

      const shop = await Shop.findOne({ uuid: shopId });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      const updatedStats = await Stats.updateOne({ shop: shop.id }).set(updates);

      // Überprüfe, ob Stats aktualisiert wurden
      if (!updatedStats) {
        return res.notFound({ error: 'Stats nicht gefunden für diesen Shop' });
      }

      return res.ok(updatedStats);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Lösche Stats für einen bestimmten Shop
  delete: async function (req, res) {
    try {
      const { shopId } = req.params; // Shop-UUID aus den URL-Parametern
      const shop = await Shop.findOne({ uuid: shopId });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      const StatsObbj = await Stats.findOne({ shop: shop.id });
      const deletedStats = await Stats.destroyOne( StatsObbj.id );

      // Überprüfe, ob Stats gelöscht wurden
      if (!deletedStats) {
        return res.notFound({ error: 'Stats nicht gefunden für diesen Shop' });
      }

      return res.ok({ message: 'Stats erfolgreich gelöscht' });
    } catch (error) {
      return res.serverError(error);
    }
  }
};
