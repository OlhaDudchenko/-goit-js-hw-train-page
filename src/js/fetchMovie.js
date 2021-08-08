
 
const API_KEY = "0b4c9e96b3c484478ae1843759b93e8d";
const BASE_URL = 'https://api.themoviedb.org/3';

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page=1;
    this.SearchId =1;
      
    }

  fetchMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}`;
        //  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
         
       return fetch(url).then(response => 
        //  console.log( response.json())
         response.json()
       ).then(({ results, total_pages }) => {
            //  console.log(results);
            //  console.log(total_pages);
            
            //  this.incrementPage();
             return { results,total_pages };
         })
  }
  fetchById(){
    const url=`
https://api.themoviedb.org/3/movie/${this.SearchId}?api_key=${API_KEY}&language=en-US`
    // const url = `https://api.themoviedb.org/3/find/${this.SearchId}?api_key=${API_KEY}&language=en-US&external_source=imdb_id`;
    return fetch(url).then(response =>
      response.json()
    ).then(data => { return data})
      


}

    fetchGenres(){
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(url).then(response => response.json()).then(({ genres }) => {
            //  console.log(genres);
        return genres;
    })
}
  // incrementPage() {
  //   this.page += 1;
  // }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get pag() {
    return this.page;
  }
  set pag(newPage) {
  
     this.page = newPage;
   
  }
   get id() {
    return this.SearchId;
  }
  set id(newId) {
  
     this.SearchId = newId;
   
  }
}

// class Pagination {
//     constructor() {
        
//     }

//     createPages(total_pages) {
    
//         console.log(MovieApiService.fetchMovies)

//      }



