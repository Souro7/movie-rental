const routes = require("express").Router();
const Joi = require("joi");

const { Customer, customerJoiSchema } = require("../../models/customer");
const logger = require("../winstonLogger");

//get all customers

routes.get("/", async (req, res, next) => {
  try {
    let customers = await Customer.find();
    logger.log({
      level: "info",
      message: "get all customers"
    });
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
    if (error) throw { code: 400, message: error };
    const newCustomer = new Customer(value);
    let response = await newCustomer.save();
    logger.log({
      level: "info",
      message: "add new customer"
    });
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

//retrieve a customer

routes.get("/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findOne({ _id: customerId });
    if (!customer) throw { code: 404, message: "Customer not found" };
    logger.log({
      level: "info",
      message: "retrieve a customer"
    });
    res.status(200).send(customer);
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
    if (error) throw { code: 400, message: error };
    const updatedCustomer = await Customer.findOneAndUpdate({ _id: customerId }, { $set: value }, { new: true });
    if (!updatedCustomer) throw { code: 404, message: "Customer not found" };
    logger.log({
      level: "info",
      message: "update a customer"
    });
    res.status(200).send(updatedCustomer);
  } catch (e) {
    next(e);
  }
});

//delete a customer

routes.delete("/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const deletedCustomer = await Customer.findOneAndDelete({ _id: customerId });
    if (!deletedCustomer) throw { code: 404, message: "Customer not found" };
    logger.log({
      level: "info",
      message: "delete a customer"
    });
    res.status(200).send(deletedCustomer);
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
