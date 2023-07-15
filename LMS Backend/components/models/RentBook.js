const mongoose = require("mongoose");
const RentSchema = new mongoose.Schema({
    rentername: {
        type: String,
        required: true,
    },
    renteremail: {
        type: String,
        unique: true,
        lowercase: true
    },
    books: [{
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book Information"
        },
        returndate: {
          type: Date,
          default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          format: 'ISODate'
        },
        returned: {
          type: Boolean,
          default: false
        },
        fine: {
          type: Number,
          min: [0, "Fine cannot be less than zero"],
          max: [1500, "Max Fine is $15"],
          default: 0,
        },
        paid:{
          type:Boolean,
          default:false
        }
      }],
})

const Rent = mongoose.model(
    "Rent Information",
    RentSchema
);
module.exports = Rent;