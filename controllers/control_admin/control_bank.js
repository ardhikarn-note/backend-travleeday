module.exports = {
  viewBanks: (req, res) => {
    const title = "Travleeday | Banks";
    res.render("admin/banks/view_banks", { title });
  },
};
