
 
const API_KEY = "0b4c9e96b3c484478ae1843759b93e8d";
const BASE_URL = 'https://api.themoviedb.org/3';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.limit = 40;
      
    }

     fetchImages() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
     return fetch(url).then(response => response.json()).then(data=>console.log(data))
    //   .then(({ articles }) => {
    //     this.incrementPage();
    //     return articles;
    //   });
    }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}