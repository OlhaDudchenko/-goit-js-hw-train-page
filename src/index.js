import "../node_modules/modern-normalize/modern-normalize.css"
import NewsApiService from "./js/fetchMovie";
import oneCard from "./templates/oneCard.hbs";
import './sass/main.scss';

const movieBox=document.querySelector(".gallery")

const newsApiService = new NewsApiService();

function fetchMovie() {
newsApiService.fetchImages().then(results => {
    appendMovieMarkup(results);
    });
}

function appendMovieMarkup(results) {
  movieBox.insertAdjacentHTML('beforeend', oneCard(results));
}
fetchMovie();