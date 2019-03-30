const routes = require("express").Router();
const { Customer } = require("../../models/customer");

//get all customers

routes.get("/", async (req, res) => {
  let customers = await Customer.find();
  res.status(200).send(customers);
});

//add a new customer

routes.post("/", async (req, res) => {
  let { name, isPremium, phone } = req.body;
  const newCustomer = new Customer({ name, isPremium, phone });
  let response = await newCustomer.save();
  res.status(200).send(response);
});

//retrieve a customer

routes.get("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  await Customer.findOne({ _id: customerId }).then(response => {
    res.status(200).send(response);
  });
});

//update details of a customer

routes.put("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  let { name, isPremium, phone } = req.body;
  await Customer.findOneAndUpdate({ _id: customerId }, { $set: { name, isPremium, phone } }, { new: true }).then(response => {
    res.status(200).send(response);
  });
});

//delete a customer

routes.delete("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  await Customer.findOneAndDelete({ _id: customerId }).then(response => {
    res.status(200).send(response);
  });
});

module.exports = routes;
