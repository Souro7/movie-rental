const routes = require("express").Router();
const Joi = require("joi");

const { Customer, customerJoiSchema } = require("../../models/customer");

//get all customers

routes.get("/", async (req, res, next) => {
  try {
    let customers = await Customer.find();
    res.status(200).send(customers);
  } catch (e) {
    next(e);
  }
});

//add a new customer

routes.post("/", async (req, res, next) => {
  try {
    let { name, isPremium, phone } = req.body;
    let { error, value } = Joi.validate({ name, isPremium, phone }, customerJoiSchema);
    if (error) res.status(400).send("error in request: " + error);
    const newCustomer = new Customer(value);
    let response = await newCustomer.save();
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

//retrieve a customer

routes.get("/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    await Customer.findOne({ _id: customerId }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});

//update details of a customer

routes.put("/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    let { name, isPremium, phone } = req.body;
    let { error, value } = Joi.validate({ name, isPremium, phone }, customerJoiSchema);
    if (error) res.status(400).send("error in request:" + error);
    await Customer.findOneAndUpdate({ _id: customerId }, { $set: value }, { new: true }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});

//delete a customer

routes.delete("/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    await Customer.findOneAndDelete({ _id: customerId }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
