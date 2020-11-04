const modelItem = require("../../models/model_item");
const modelCategory = require("../../models/model_category");
const modelImage = require("../../models/model_image");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewItems: async (req, res) => {
    try {
      const item = await modelItem
        .find()
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({
          path: "categoryId",
          select: "id name",
        }); // for Read Item
      const category = await modelCategory.find();
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const title = "Travleeday | Items";
      const action = "view";
      res.render("admin/items/view_items", {
        category,
        alert,
        title,
        item,
        action,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/items");
    }
  },

  addItem: async (req, res) => {
    try {
      const { categoryId, title, price, city, description } = req.body;
      if (req.files.length > 0) {
        const category = await modelCategory.findOne({ _id: categoryId });
        const addItem = {
          categoryId: category._id,
          title,
          price,
          city,
          description,
        };
        const item = await modelItem.create(addItem);
        category.itemId.push({ _id: item._id });
        await category.save();
        // loop image multiple
        for (i = 0; i < req.files.length; i++) {
          const imageSave = await modelImage.create({
            imageUrl: `uploadMultiple/${req.files[i].filename}`,
          });
          item.imageId.push({ _id: imageSave._id });
          await item.save();
        }
        req.flash("alertMessage", "Success Add Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/items");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/items");
    }
  },

  showImageItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await modelItem.findOne({ _id: id }).populate({
        path: "imageId",
        select: "id imageUrl",
      }); // for Read Item
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const title = "Travleeday | Show Image Item";
      const action = "show image";
      res.render("admin/items/view_items", {
        alert,
        title,
        item,
        action,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/items");
    }
  },

  showEditItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await modelItem
        .findOne({ _id: id })
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({
          path: "categoryId",
          select: "id name",
        }); // for Read Item
      const category = await modelCategory.find();
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const title = "Travleeday | Edit Item";
      const action = "edit";
      res.render("admin/items/view_items", {
        category,
        alert,
        title,
        item,
        action,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/items");
    }
  },

  editItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryId, title, price, city, description } = req.body;
      const item = await modelItem
        .findOne({ _id: id })
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({
          path: "categoryId",
          select: "id name",
        }); // for Read Item
      if (req.files.length > 0) {
        for (i = 0; i < item.imageId.length; i++) {
          const imageUpdate = await modelImage.findOne({
            _id: item.imageId[i]._id,
          });
          await fs.unlink(path.join(`uploads/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `uploadMultiple/${req.files[i].filename}`;
          await imageUpdate.save();
        }
        (item.title = title),
          (item.price = price),
          (item.city = city),
          (item.description = description),
          (item.categoryId = categoryId);
        await item.save();
        req.flash("alertMessage", "Success Update Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/items");
      } else {
        (item.title = title),
          (item.price = price),
          (item.city = city),
          (item.description = description),
          (item.categoryId = categoryId);
        await item.save();
        req.flash("alertMessage", "Success Update Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/items");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.msg}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/items");
    }
  },
};
