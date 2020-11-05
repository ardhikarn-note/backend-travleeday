const modelActivity = require("../../models/model_activity");
const modelItem = require("../../models/model_item");

module.exports = {
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
