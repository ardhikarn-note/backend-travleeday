const modelItem = require("../../models/model_item");
const modelBooking = require("../../models/model_booking");
const modelActivity = require("../../models/model_activity");
const modelCategory = require("../../models/model_category");
const modelTestimonial = require("../../models/model_testimonial");

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
          select: "_id title imageId sumBooking isPopular city country",
          perDocumentLimit: 4,
          options: { sort: { sumBooking: -1 } },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });

      // ISPOPULAR
      for (let a = 0; a < category.length; a++) {
        for (let x = 0; x < category[a].itemId.length; x++) {
          const item = await modelItem.findOne({
            _id: category[a].itemId[x]._id,
          });
          item.isPopular = false;
          await item.save();
          if (category[a].itemId[0] === category[a].itemId[x]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial2.jpg",
        name: "Happy Family",
        rate: 4.55,
        message:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };

      res.status(200).json({
        hero: {
          travelers: treveler.length,
          treasures: treasure.length,
          cities: totalCities,
        },
        mostPick,
        category,
        testimonial,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
