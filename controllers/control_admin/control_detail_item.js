const modelActivity = require("../../models/model_activity");
const modelItem = require("../../models/model_item");
const modelFeature = require("../../models/model_feature");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  detailItem: async (req, res) => {
    const { itemId } = req.params;
    try {
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const feature = await modelFeature.find({ itemId: itemId });
      const activity = await modelActivity.find({ itemId: itemId });
      const title = "Travleeday | Detail Item";
      res.render("admin/items/detail_item/detail_item", {
        title,
        alert,
        itemId,
        feature,
        activity,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    }
  },

  addFeature: async (req, res) => {
    const { name, qty, itemId } = req.body;
    try {
      if (!req.file) {
        req.flash("alertMessage", "Image not Found");
        req.flash("alertStatus", "danger");
        res.redirect(`/admin/items/detail-item/${itemId}`);
      }
      const feature = await modelFeature.create({
        name,
        qty,
        itemId,
        imageUrl: `upload/${req.file.filename}`,
      });
      const item = await modelItem.findOne({ _id: itemId });
      item.featureId.push({ _id: feature._id });
      await item.save();
      req.flash("alertMessage", "Success Add Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    }
  },

  editFeature: async (req, res) => {
    const { id, name, qty, itemId } = req.body;
    try {
      const feature = await modelFeature.findOne({ _id: id });
      if (req.file == undefined) {
        feature.name = name;
        feature.qty = qty;
        await feature.save();
        req.flash("alertMessage", "Success Update Feature");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/items/detail-item/${itemId}`);
      } else {
        await fs.unlink(path.join(`uploads/${feature.imageUrl}`));
        feature.name = name;
        feature.qty = qty;
        feature.imageUrl = `upload/${req.file.filename}`;
        await feature.save();
        req.flash("alertMessage", "Success Update Feature");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/items/detail-item/${itemId}`);
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    }
  },

  deleteFeature: async (req, res) => {
    const { id, itemId } = req.params;
    try {
      const feature = await modelFeature.findOne({ _id: id });
      const item = await modelItem
        .findOne({ _id: itemId })
        .populate("featureId");
      for (i = 0; i < item.featureId.length; i++) {
        if (item.featureId[i]._id.toString() === feature._id.toString()) {
          item.featureId.pull({ _id: feature._id });
          await item.save();
        }
      }
      await fs.unlink(path.join(`uploads/${feature.imageUrl}`));
      await feature.remove();
      req.flash("alertMessage", "Success Delete Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    }
  },

  addActivity: async (req, res) => {
    const { name, type, itemId } = req.body;
    try {
      if (!req.file) {
        req.flash("alertMessage", "Image not Found");
        req.flash("alertStatus", "danger");
        res.redirect(`/admin/items/detail-item/${itemId}`);
      }
      const activity = await modelActivity.create({
        name,
        type,
        itemId,
        imageUrl: `upload/${req.file.filename}`,
      });
      const item = await modelItem.findOne({ _id: itemId });
      item.activityId.push({ _id: activity._id });
      await item.save();
      req.flash("alertMessage", "Success Add Activity");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/items/detail-item/${itemId}`);
    }
  },
};
