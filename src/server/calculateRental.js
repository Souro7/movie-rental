const moment = require("moment");

async function getRentalFee(movie, dateIssued, dateReturned) {
  let dateDiff = moment(dateReturned).diff(moment(dateIssued), "days");
  return dateDiff * movie.dailyRentalRate;
}

module.exports = getRentalFee;
