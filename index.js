movieTitle = "";


document.getElementById("search-button").addEventListener("click", searchForMovie)



function searchForMovie(){
    movieTitle = document.getElementById("search").value;
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=36b0b502&s=${movieTitle}`)
    .then(response => response.json())
    .then(data => console.log(data))
}



function renderList(movieArray){


}