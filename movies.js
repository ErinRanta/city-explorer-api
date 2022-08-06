const axios = require('axios').default;


class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_date = movie.release_date;
  }
}
async function handleMovies(request, response) {
  let search = request.query.query;
  let movieKey = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${search}`;
  await axios.get(movieKey)
    .then(res => {
      console.log('this is supposed to be the query:', request.query.search);
      console.log(res.data.results.map(movie => new Movies(movie)));
      response.send(res.data.results.map(movie => new Movies(movie)));
    })
    .catch((e) => {
      console.log(e);
      response.status(500).send(e);
    });
}

module.exports = handleMovies;