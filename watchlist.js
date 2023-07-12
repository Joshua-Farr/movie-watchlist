mainSectionDisplay = document.getElementById("main-section");
// document.getElementById("return-to-search").addEventListener("click", updateMovieLocalStorage);


let moviesFromLocalStorage = [];

addEventListener("DOMContentLoaded", (event) => {
    console.log(" new page loaded!")
    moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovieWatchlist"));
    console.log(moviesFromLocalStorage);
    console.log("we have the moveies!")
    renderMovie(moviesFromLocalStorage);

});


document.addEventListener("click", function(e){
    if(moviesFromLocalStorage.length){
        const movieToRemoveIndex = moviesFromLocalStorage.findIndex((movie) => movie.imdbID === e.target.id);
        moviesFromLocalStorage.splice(movieToRemoveIndex, 1);
        localStorage.setItem("myMovieWatchlist", JSON.stringify(moviesFromLocalStorage)); 
        moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovieWatchlist"));
        console.log(moviesFromLocalStorage);
        renderMovie(moviesFromLocalStorage);



    }else{
        renderPlaceholder();
    }
})


// function updateMovieLocalStorage(){
//     localStorage.setItem("myMovieWatchlist", JSON.stringify(moviesFromLocalStorage)); 
// }



function renderMovie(myMoviesArray){
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
                            <button class="watchlist-btn" id="${myMoviesArray[i].imdbID}"><img src="./assets/minus.png" alt="" class="add-img" ></button>
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