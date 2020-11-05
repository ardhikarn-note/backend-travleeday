const modelBank = require("../../models/model_bank");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewBanks: async (req, res) => {
    try {
      const bank = await modelBank.find(); // for Read bank
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const title = "Travleeday | Banks";
      res.render("admin/banks/view_banks", { title, alert, bank });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
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
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/banks");
    }
  },

  editBank: async (req, res) => {
    try {
      const { id, nameBank, noRek, name } = req.body;
      const bank = await modelBank.findOne({ _id: id });
      if (req.file == undefined) {
        bank.nameBank = nameBank;
        bank.noRek = noRek;
        bank.name = name;
        await bank.save();
        req.flash("alertMessage", "Success Update Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/banks");
      } else {
        await fs.unlink(path.join(`uploads/${bank.imageUrl}`));
        bank.nameBank = nameBank;
        bank.noRek = noRek;
        bank.name = name;
        bank.imageUrl = `upload/${req.file.filename}`;
        await bank.save();
        req.flash("alertMessage", "Success Update Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/banks");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/banks");
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await modelBank.findOne({ _id: id });
      await fs.unlink(path.join(`uploads/${bank.imageUrl}`));
      await bank.remove();
      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/banks");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/banks");
    }
  },
};
