const modelBooking = require("../../models/model_booking");
const modelItem = require("../../models/model_item");
const modelMember = require("../../models/model_member");

module.exports = {
  bookingPage: async (req, res) => {
    try {
      const {
        idItem,
        duration,
        // price,
        bookingStartDate,
        bookingEndDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        accountHolder,
        bankFrom,
      } = req.body;
      if (!req.file) {
        return res.status(404).json({ message: "Image not found" });
      }
      if (
        idItem === undefined ||
        duration === undefined ||
        // price === undefined ||
        bookingStartDate === undefined ||
        bookingEndDate === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        phoneNumber === undefined ||
        accountHolder === undefined ||
        bankFrom === undefined
      ) {
        res.status(404).json({ message: "Please complete the field" });
      }

      const item = await modelItem.findOne({ _id: idItem });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      item.sumBooking += 1;
      await item.save();

      let total = item.price * duration;
      const tax = Math.round(total * 0.1 * 100) / 100; // 2 Decimals ==> 2.40
      const invoice = Math.floor(1000000 + Math.random() * 9000000);

      // Booking Information
      const member = await modelMember.create({
        firstName,
        lastName,
        email,
        phone: phoneNumber,
      });

      const newBooking = {
        invoice,
        bookingStartDate,
        bookingEndDate,
        total: (total += tax),
        itemId: {
          _id: item.id,
          title: item.title,
          price: item.price,
          duration,
        },
        memberId: member.id,
        payments: {
          proofPayment: `upload/${req.file.filename}`,
          bankFrom,
          accountHolder,
        },
      };

      const booking = await modelBooking.create(newBooking);

      res.status(201).json({ message: "Success Booking", booking });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
