const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 100,
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
const Customer = mongoose.model("customers", customerSchema);

module.exports = {
  Customer
};
