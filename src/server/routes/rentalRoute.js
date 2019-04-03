const routes = require("express").Router();
const Joi = require("joi");
const moment = require("moment");

const { Rental, rentalJoiSchema } = require("../../models/rental");
const { Movie, movieJoiSchema } = require("../../models/movie");
const { Customer, customerJoiSchema } = require("../../models/customer");
const logger = require("../winstonLogger");

//get all rentals

routes.get("/", async (req, res, next) => {
  try {
    let rentals = await Rental.find();
    logger.log({
      level: "info",
      message: "get all rentals"
    });
    res.status(200).send(rentals);
  } catch (e) {
    next(e);
  }
});

//add a new rental

routes.post("/", async (req, res, next) => {
  try {
    let { customer, movie, dateIssued, dateReturned } = req.body;
    if (!dateReturned) dateReturned = dateIssued;

    let { error, value } = Joi.validate({ customer, movie, dateIssued, dateReturned }, rentalJoiSchema);
    if (error) res.status(400).send("error in request: " + error);

    const customerFound = await Customer.findOne({ _id: value.customer });
    if (!customerFound) throw { message: "Customer not found" };
    const movieFound = await Movie.findOne({ _id: value.movie });
    if (!movieFound) throw { message: "Movie not found" };

    //calculate rentalFee
    let dateDiff = moment(dateReturned).diff(moment(dateIssued), "days");
    let movieSelected = await Movie.findOne({ _id: movie });
    let rentalFee = dateDiff * movieSelected.dailyRentalRate;

    const newRental = new Rental(value);
    let response = await newRental.save();
    logger.log({
      level: "info",
      message: "add a new rental"
    });
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

//update a rental
routes.put("/:rentalId", async (req, res, next) => {
  try {
    let rentalId = req.params.rentalId;
    let { customer, movie, dateIssued, dateReturned } = req.body;

    let { error, value } = Joi.validate({ customer, movie, dateIssued, dateReturned }, rentalJoiSchema);
    if (error) res.status(400).send("error in request: " + error);

    const customerFound = await Customer.findOne({ _id: value.customer });
    if (!customerFound) throw { message: "Customer not found" };
    const movieFound = await Movie.findOne({ _id: value.movie });
    if (!movieFound) throw { message: "Movie not found" };

    //calculate rentalFee
    let dateDiff = moment(dateReturned).diff(moment(dateIssued), "days");
    let movieSelected = await Movie.findOne({ _id: movie });
    let rentalFee = dateDiff * movieSelected.dailyRentalRate;

    const updatedRental = await Rental.findOneAndUpdate({ _id: rentalId }, { $set: value }, { new: true });
    if (!updatedRental) throw { message: "Rental not found" };
    logger.log({
      level: "info",
      message: "update a rental"
    });
    res.status(200).send(updatedRental);
  } catch (e) {
    next(e);
  }
});
module.exports = routes;
