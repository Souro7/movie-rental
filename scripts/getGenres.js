let movies = require("./seedData.json");

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

module.exports = {
  genre
};
