const Category = require("../../models/model_category");

module.exports = {
  viewCategories: (req, res) => {
    res.render("admin/categories/view_categories");
  },

  addCategory: async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.redirect("/admin/categories");
  },
};
