const modelBank = require("../../models/model_bank");

module.exports = {
  viewBanks: async (req, res) => {
    try {
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const title = "Travleeday | Banks";
      res.render("admin/banks/view_banks", { title, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/banks");
    }
  },

  addBank: async (req, res) => {
    try {
      const { nameBank, noRek, name } = req.body;
      await modelBank.create({
        nameBank,
        noRek,
        name,
        imageUrl: `upload/${req.file.filename}`,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/banks");
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/banks");
    }
  },
};
