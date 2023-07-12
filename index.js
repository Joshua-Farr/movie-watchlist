movieTitle = "";



document.getElementById("search-button").addEventListener("click", searchForMovie)
mainSectionDisplay = document.getElementById("main-section");


function searchForMovie(){
    movieTitle = document.getElementById("search").value;
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=36b0b502&s=${movieTitle}&page=1`)
    .then( response => response.json())
    .then(data => {
        clearMovieArea();
        getMovieInformation(data.Search)
    })
}

function getMovieInformation(movieArray){
    movieArray.forEach(function(movie){
        fetch(`http://www.omdbapi.com/?apikey=36b0b502&i=${movie.imdbID}`)
        .then(response => response.json())
        .then(data => renderMovie(data))
    })
}

function clearMovieArea(){
    mainSectionDisplay.innerHTML = "";
}


function renderMovie(movie){
        mainSectionDisplay.innerHTML +=
            `<div class="movie">
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
                        <div class="add-to-watchlist-section">
                            <button class="watchlist-btn"><img src="./assets/plus.png" alt="" class="add-img"></button>
                            <h3 class="watchlist-text">Watchlist</h3>
                        </div>
                    </div>
                    <p class="movie-description">${movie.Plot}</p>
                    
                    
                </div>

            </div>`

}