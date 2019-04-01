let movies = require("./seedData.json");
require("../src/db/dbConnect");
const { Genre } = require("../src/models/genre");

let genres = [];
let genre = [];
// console.log(movies.length);

for (let i = 0; i < movies.length; i++) {
  if (!genres.includes(movies[i].genre)) genres.push(movies[i].genre);
}
for (let i = 0; i < genres.length; i++) {
  genre.push({ name: genres[i] });
}

// console.log(genre);

async function addGenres() {
  await Genre.deleteMany();
  await Genre.insertMany(genre);
  console.log("done");
}

addGenres();

module.exports = {
  genre
};
