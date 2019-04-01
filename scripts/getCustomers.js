let customers = require("./customers.json");
require("../src/db/dbConnect");
const { Customer } = require("../src/models/customer");

async function addCustomers() {
  await Customer.deleteMany();
  await Customer.insertMany(customers);
  console.log("done");
}

addCustomers();
