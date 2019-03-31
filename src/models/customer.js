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
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true
  }
});
const Customer = mongoose.model("customers", customerSchema);

const customerJoiSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .min(1)
    .max(20),
  isPremium: Joi.boolean().required(),
  phone: Joi.string()
    .trim()
    .min(10)
    .max(10)
});

module.exports = {
  Customer,
  customerJoiSchema
};
