const routes = require("express").Router();
const Joi = require("joi");
const moment = require("moment");

const { Rental, rentalJoiSchema } = require("../../models/rental");
const { Movie, movieJoiSchema } = require("../../models/movie");

//get all rentals

routes.get("/", async (req, res, next) => {
  try {
    let rentals = await Rental.find();
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
    console.log(dateIssued, dateReturned);

    //calculate rentalFee
    let dateDiff = moment(dateReturned).diff(moment(dateIssued), "days");
    let movieSelected = await Movie.findOne({ _id: movie });
    let rentalFee = dateDiff * movieSelected.dailyRentalRate;

    let { error, value } = Joi.validate({ customer, movie, dateIssued, dateReturned, rentalFee }, rentalJoiSchema);
    if (error) res.status(400).send("error in request: " + error);
    const newRental = new Rental(value);
    let response = await newRental.save();
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

    //calculate rentalFee
    let dateDiff = moment(dateReturned).diff(moment(dateIssued), "days");
    let movieSelected = await Movie.findOne({ _id: movie });
    let rentalFee = dateDiff * movieSelected.dailyRentalRate;

    let { error, value } = Joi.validate({ customer, movie, dateIssued, dateReturned, rentalFee }, rentalJoiSchema);
    if (error) res.status(400).send("error in request: " + error);
    await Rental.findOneAndUpdate({ _id: rentalId }, { $set: value }, { new: true }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});
module.exports = routes;
