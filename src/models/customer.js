const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
});
const Customer = mongoose.model("Customer", customerSchema);

module.exports = {
  Customer
};
