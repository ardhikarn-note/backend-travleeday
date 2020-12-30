const modelItem = require("../../models/model_item");
const modelBooking = require("../../models/model_booking");
const modelActivity = require("../../models/model_activity");
const modelCategory = require("../../models/model_category");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const treveler = await modelBooking.find();
      const treasure = await modelActivity.find();
      const city = await modelItem.find().select("city");
      // GET TOTAL CITY
      const citiesArr = [];
      for (let i = 0; i < city.length; i++) {
        citiesArr.push(city[i].city);
      }
      let totalCities = 0;
      for (let j = 0; j < citiesArr.sort().length; j++) {
        if (citiesArr.sort()[j] !== citiesArr.sort()[j + 1]) {
          totalCities += 1;
        }
      }

      const mostPick = await modelItem
        .find()
        .select("_id title imageId price city country unit")
        .limit(5)
        .populate({ path: "imageId", select: "_id imageUrl" });

      const category = await modelCategory
        .find()
        .select("_id name")
        .limit(3)
        .populate({
          path: "itemId",
          select: "_id title imageId isPopular city country",
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
          perDocumentLimit: 4,
        });

      res.status(200).json({
        hero: {
          travelers: treveler.length,
          treasures: treasure.length,
          cities: totalCities,
        },
        mostPick,
        category,
      });
    } catch (error) {}
  },
};
