import './sass/main.scss';
import NewsApiService from "./js/fetchMovie";




const newsApiService = new NewsApiService();
newsApiService.fetchImages();