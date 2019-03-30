const routes = require("express").Router();
const { Rental } = require("../../models/rental");

//get all rentals

routes.get("/", async (req, res) => {
  let rentals = await Rental.find();
  res.status(200).send(rentals);
});

//add a new rental
