const modelItem = require("../../models/model_item");
const modelBooking = require("../../models/model_booking");
const modelActivity = require("../../models/model_activity");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPick = await modelItem
        .find()
        .select("_id title imageId price city country unit")
        .limit(5)
        .populate({ path: "imageId", select: "_id imageUrl" });

      const treveler = await modelBooking.find();
      const treasure = await modelActivity.find();
      const city = await modelItem.find();

      res.status(200).json({
        hero: {
          travelers: treveler.length,
          treasures: treasure.length,
          cities: city.length,
        },
        mostPick,
      });
    } catch (error) {}
  },
};
