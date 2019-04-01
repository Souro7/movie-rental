require("../src/db/dbConnect");
let movies = require("./seedData.json");
const { genre } = require("./getGenres");
const { Movie } = require("../src/models/movie");
const { Genre } = require("../src/models/genre");

async function getEachMovie(movie) {
  return await Genre.findOne({ name: movie.genre }).then(data => {
    return {
      title: movie.title,
      genre: data["_id"],
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  });
}

Promise.all(movies.map(getEachMovie)).then(async movieArr => {
  await Movie.deleteMany();
  await Movie.insertMany(movieArr);
  console.log(movieArr);
});
