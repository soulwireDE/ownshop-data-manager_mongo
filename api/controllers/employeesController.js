module.exports = {
  // Create new employee
  create: async function (req, res) {
    try {
      const shopId = req.param("shopId");

      const shop = await Shop.findOne({ uuid: shopId });
      console.log("Shop ID ", shop);
      if (!shop) {
        return res.status(404).json({ error: "Shop not found cccc" });
      }

      const { Name, grade, empUser, passwd, isBoss, payment, reward, meta } =
        req.body;

      const newEmployee = await Employee.create({
        Name,
        grade,
        empUser,
        passwd,
        isBoss,
        payment,
        reward,
        meta,
        shop: shop.id,
      }).fetch();

      return res.status(201).json(newEmployee);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Update an employee
  update: async function (req, res) {
    try {
      const employeeId = req.param("id");
      const updatedEmployee = await Employee.updateOne({ id: employeeId }).set(
        req.body
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      return res.json(updatedEmployee);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Delete an employee
  delete: async function (req, res) {
    try {
      const employeeId = req.param("id");
      const deletedEmployee = await Employee.destroyOne({ id: employeeId });

      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      return res.status(204).send();
    } catch (err) {
      return res.serverError(err);
    }
  },
};
