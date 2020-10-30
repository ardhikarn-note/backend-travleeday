const modelCategory = require("../../models/model_category");

module.exports = {
  viewCategories: async (req, res) => {
    const category = await modelCategory.find();
    res.render("admin/categories/view_categories", { category });
  },

  addCategory: async (req, res) => {
    const { name } = req.body;
    await modelCategory.create({ name });
    res.redirect("/admin/categories");
  },
};
