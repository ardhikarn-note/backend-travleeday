module.exports = {
  viewItems: (req, res) => {
    const title = "Travleeday | Items";
    res.render("admin/items/view_items", { title });
  },
};
