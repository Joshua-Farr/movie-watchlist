document
  .getElementById("search-button")
  .addEventListener("click", searchForMovie);

mainSectionDisplay = document.getElementById("main-section");
let selectedMovies = [];

//Adding search funcitonality with "Enter" key press
document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchForMovie();
  }
});

//Getting movie list from localStorage on page reload
document.addEventListener("DOMContentLoaded", () => {
  selectedMovies = JSON.parse(localStorage.getItem("myMovieWatchlist"));
});

function searchForMovie() {
  movieTitle = document.getElementById("search").value;
  fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=36b0b502&s=${movieTitle}&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.Error) {
        renderNotFound();
      } else {
        clearMovieArea();
        getMovieInformation(data.Search);
      }
    });
}

//Gets additiional details from the API using the imdbID returned from searchForMovie()
function getMovieInformation(movieArray) {
  movieArray.forEach(function (movie) {
    fetch(`http://www.omdbapi.com/?apikey=36b0b502&i=${movie.imdbID}`)
      .then((response) => response.json())
      .then((data) => renderMovie(data));
  });
}

//removes initial placeholder
function clearMovieArea() {
  mainSectionDisplay.innerHTML = "";
}

//Adding movies to the watchlist
document.addEventListener("click", function (e) {
  fetch(`http://www.omdbapi.com/?apikey=36b0b502&i=${e.target.id}`)
    .then((response) => response.json())
    .then((data) => {
      //checking to see if movie has already been added to the list
      const isMovieSelected = selectedMovies.findIndex(
        (movie) => movie.imdbID === e.target.id
      );
      if (data.Error) {
        console.log("error!");
      } else if (isMovieSelected === -1) {
        selectedMovies.push(data);
        localStorage.setItem(
          "myMovieWatchlist",
          JSON.stringify(selectedMovies)
        );
      }
    });
});

function renderNotFound() {
  mainSectionDisplay.innerHTML = `<h3 class="placeholder-text center">Unable to find what you’re looking for. 
        Please try another search.</h3>`;
}

//Renders complete list of returned movies from the API
function renderMovie(movie) {
  mainSectionDisplay.innerHTML += `<div class="movie">
                <img class="movie-poster" src=${movie.Poster} alt="">
                <div class="details">
                    <div class="title">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <img src="./assets/Star.png" alt="">
                        <h2 class="rating">${movie.imdbRating}</h2>
                    </div>
                    <div class="extra-details">
                        <h3 class="runtime">${movie.Runtime}</h3>
                        <h3 class="genre">${movie.Genre}</h3>
                        <div class="add-to-watchlist-section" id="${movie.imdbID}">
                            <img src="./assets/plus.png" alt="" class="add-img watchlist-btn" id="${movie.imdbID}"></button>
                            <h3 class="watchlist-text" id="${movie.imdbID}">Watchlist</h3>
                        </div>
                    </div>
                    <p class="movie-description">${movie.Plot}</p>
                </div>

            </div>`;
}
