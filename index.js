

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
import { key } from './key.js';



let getMovie = () => {
    let movieName = movieNameRef.value.trim();
    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${key}`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Search API Response:", data); // Log the search response for debugging

            if (data.Response === "False") {
                result.innerHTML = `<h3 class="msg">Movie not found</h3>`;
            } else {
                if (data.Search && data.Search.length > 0) {
                    let movie = data.Search[0];
                    let movieDetailsUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${key}`;

                    fetch(movieDetailsUrl)
                        .then(response => response.json())
                        .then(movieData => {
                            console.log("Movie Details Response:", movieData); // Log the movie details response for debugging

                            result.innerHTML = `
                            <div class="info">
                                <img src="${movieData.Poster}" class="poster" alt="${movieData.Title} Poster">
                                <div>
                                    <h2>${movieData.Title}</h2>
                                    <div class="rating">
                                        <img src="star.svg" alt="Rating Star">
                                        <h4>${movieData.imdbRating}</h4>
                                    </div>
                                    <div class="details">
                                        <span>${movieData.Rated}</span>
                                        <span>${movieData.Runtime}</span>
                                        <span>${movieData.Year}</span>
                                    </div>
                                    <div class="genre">
                                        <div>${movieData.Genre.split(",").join("</div><div>")}</div>
                                    </div>
                                </div>
                            </div>

                            <h3>Plot:</h3>
                            <p>${movieData.Plot}</p>
                            <h3>Director:</h3>
                            <p>${movieData.Director}</p>
                            <h3>Actors:</h3>
                            <p>${movieData.Actors}</p>
                            `;
                        })
                        .catch(err => {
                            console.error("Error fetching movie details:", err);
                            result.innerHTML = `<h3 class="msg">An error occurred while fetching movie details</h3>`;
                        });
                } else {
                    result.innerHTML = `<h3 class="msg">No results found</h3>`;
                }
            }
        })
        .catch(err => {
            console.error("Error fetching search results:", err);
            result.innerHTML = `<h3 class="msg">An error occurred while fetching movie data</h3>`;
        });
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
