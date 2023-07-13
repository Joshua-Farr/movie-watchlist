mainSectionDisplay = document.getElementById("main-section");

let moviesFromLocalStorage = [];

addEventListener("DOMContentLoaded", (event) => {
    moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovieWatchlist"));
    if(moviesFromLocalStorage.length === 0){
        return;
    }
    renderMovie(moviesFromLocalStorage);
});


document.addEventListener("click", function(e){
    let movieID = e.target.id;
    const movieToRemoveIndex = moviesFromLocalStorage.findIndex((movie) => movie.imdbID === e.target.id);
    if(movieToRemoveIndex != -1 && moviesFromLocalStorage.length > 1){
        moviesFromLocalStorage.splice(movieToRemoveIndex, 1);

        //saving to local storage and then reloading 
        localStorage.setItem("myMovieWatchlist", JSON.stringify(moviesFromLocalStorage)); 
        moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovieWatchlist"));

        renderMovie(moviesFromLocalStorage);
        
    //handing if there is only one movie left in the watchlist array
    }else if(movieToRemoveIndex != -1 && moviesFromLocalStorage.length === 1){
        moviesFromLocalStorage.splice(movieToRemoveIndex, 1);
        
        //saving to local storage and then reloading 
        localStorage.setItem("myMovieWatchlist", JSON.stringify(moviesFromLocalStorage)); 
        moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovieWatchlist"));
        renderPlaceholder();
    }

})


function renderMovie(myMoviesArray){
    //Clearing the display area
    mainSectionDisplay.innerHTML = "";
    for(i =0; i < myMoviesArray.length; i++){
        mainSectionDisplay.innerHTML +=
            `<div class="movie">
                <img class="movie-poster" src=${myMoviesArray[i].Poster} alt="">
                <div class="details">
                    <div class="title">
                        <h2 class="movie-title">${myMoviesArray[i].Title}</h2>
                        <img src="./assets/Star.png" alt="">
                        <h2 class="rating">${myMoviesArray[i].imdbRating}</h2>  
                    </div>
                    <div class="extra-details">
                        <h3 class="runtime">${myMoviesArray[i].Runtime}</h3>
                        <h3 class="genre">${myMoviesArray[i].Genre}</h3>
                        <div class="add-to-watchlist-section" id="${myMoviesArray[i].imdbID}">
                            <img src="./assets/minus.png" alt="" class="add-img watchlist-btn" id="${myMoviesArray[i].imdbID}">
                            <h3 class="watchlist-text" id="${myMoviesArray[i].imdbID}">Remove</h3>
                        </div>
                    </div>
                    <p class="movie-description">${myMoviesArray[i].Plot}</p>   
                </div>
    
            </div>`
    }
}


function renderPlaceholder(){
    mainSectionDisplay.innerHTML =
            `<div class="placeholder-image">
                <h3 class="placeholder-text">Your watchlist is looking a little empty...</h3>
                <div class="subtitle">
                    <img src="./assets/plus.png" alt="">
                    <h3 class="placeholder-text2">Let’s add some movies!</h3>
                </div>
            </div>`
}