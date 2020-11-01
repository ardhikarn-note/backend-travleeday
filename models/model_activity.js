const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
