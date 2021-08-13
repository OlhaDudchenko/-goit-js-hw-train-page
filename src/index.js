import "../node_modules/modern-normalize/modern-normalize.css";
import MovieApiService from "./js/fetchMovie";
import oneCard from "./templates/oneCard.hbs";
import movieCardById from "./templates/movieCardById";
import './sass/main.scss';
import Plyr from 'plyr';
import { Notify } from "notiflix";

const player = new Plyr('#player');



const movieBox = document.querySelector(".gallery");
console.log(movieBox);
const pagination = document.querySelector(".pagination");

const movieApiService = new MovieApiService();

async function fetchMovie() {
    const { results, total_pages } = await movieApiService.fetchMovies();
    console.log(results)
    appendMovieMarkup(results);

}


function appendMovieMarkup(results) {
    // console.log(results);
    // console.log(genres);
    
    
    // const genre = genres.map(genre => genre.id);
    // // console.log(...genre);
    // const genreName = genres.map(genre => genre.name);
    // // console.log(genreName)
    // // let resultId = results.flatMap(result => result.genre_ids);
    // // console.log(resultId)
    // if (resultId.includes(...genre)) {
    //     // console.log(resultId = genreName);
    //     // console.log("true")
     
    // }
    // let name = [];
    // results.forEach(result => {
    //     result.genre_ids.map(id => {
            
    //         genres.map(genre => {
    //             // console.log(genre.id)
    //             if (genre.id === id) {
    //                 id = genre.name;
    //                 name.push(id)
                    
    //                 // movieBox.insertAdjacentHTML('beforeend', oneCard({ results,genres}));
    //             }
            
    //         })
    //     })
    // })

 movieBox.insertAdjacentHTML('beforeend', oneCard(results));
}
fetchMovie();
createPages();

pagination.addEventListener("click", onBtnClick);
// console.log(pagination);
// const parentBtnPrevious = pagination.firstElementChild;
// console.log(parentBtnPrevious)
// const btnPrevious = parentBtnPrevious.firstElementChild;
//     console.log(btnPrevious)

let pageNumbers = [1];
let visibleCountPages = 10;

async function onBtnClick(e) {
    console.log(e.target)
    const btnPrevious=document.querySelector('button[name="previous"]')
    // console.log(e.target.classList.contains('page_item'))
    if (!(e.target.classList.contains('page_item')||e.target.classList.contains("page_link_next")||e.target.classList.contains("page_link_previous")) ){
       return;
    }
    if (e.target.textContent === "2"||pageNumbers.length=== 1) {
        // console.log(pageNumbers.length)
        btnPrevious.disabled=false;
    }
    const items = document.querySelectorAll(".page_item");
    // console.log(items)
    if (+e.target.dataset.index >(visibleCountPages/2)) {
        
        // const items = document.querySelectorAll(".page_item");
        
        items.forEach((item)=> {
            // items.slice()
            if (!((+item.textContent) === 500)) {
                return item.textContent = Number(item.textContent) + 1;
            }
        
        })
    }
 if((+e.target.dataset.index)<(visibleCountPages/2)) {
   
     for (let item of items) {
        
         if ((+item.textContent)=== 500||(item.textContent)===1) {
           
             break;
           }
          item.textContent = Number(item.textContent) - 1;
     }
          
        
    };
    clearMovieBox();

    if (e.target.classList.contains("page_item")) {
    const savedValue = +e.target.textContent;
    pageNumbers.push(savedValue);
    }
console.log(pageNumbers)
    const numberBeforeNext = pageNumbers[pageNumbers.length - 1];
    // console.log(numberBeforeNext)
    if (e.target.textContent === "Next") {
        console.log(pageNumbers);
        // console.log(numberBeforeNext)
        movieApiService.pag = numberBeforeNext + 1;
        pageNumbers.push(movieApiService.pag);
        fetchMovie();
        items.forEach((item) => {
            // items.slice()
            if (!((+item.textContent) === 500)) {
                return item.textContent = Number(item.textContent) + 1;
            }
        
        })
    }
     if (e.target.textContent === "Previous") {
        // console.log(pageNumbers);
        for (let item of items){
         if ((+item.textContent)=== 500||(+e.target.textContent)===1) {
        //    btnPrevious.disabled=true;
             break;
           }
          item.textContent = Number(item.textContent) - 1;
     }
        
        
    
        movieApiService.pag = numberBeforeNext - 1;
        pageNumbers.push(movieApiService.pag);
        fetchMovie();
        if (movieApiService.pag === 1) {
            btnPrevious.disabled=true;
        }
         
    }
     else {
     movieApiService.pag = +e.target.textContent;
    console.log(movieApiService.pag);
    console.log(e.target.textContent)
    fetchMovie(); 
    }
   
   

}
// console.log(pageNumbers);

function clearMovieBox() {
    movieBox.innerHTML = "";
}

 
async function createPages() {
    
    const {results,total_pages } = await movieApiService.fetchMovies();
    for (let i = 1; i <= total_pages; i++) {
        pagination.insertAdjacentHTML("beforeend", `<li class="page_item"  data-index="${i}">${i}</li>`);
  }
    const items = document.querySelectorAll(".page_item");
    // console.log(items);
    items.forEach(item => {
           
        if (item.textContent > 10) {
                // console.log(item.textContent)
                item.style.display = 'none';
            // item.setAttribute("data-visibility","visible");
            }
         if (item.textContent === total_pages.toString()) {
             item.style.display = 'block';
             item.insertAdjacentHTML("beforebegin",'<div class="dots">...</div>')
            }
            });

    pagination.insertAdjacentHTML("afterbegin",'<button name="previous" class="page_link_previous" >Previous</button>')
    pagination.insertAdjacentHTML("beforeend",'<button name="next" class="page_link_next">Next</button> ')
    const btnPrevious=document.querySelector('button[ name="previous"]')
    // console.log(btnPrevious)
    btnPrevious.disabled=true;
     
}
//  --------------------------------------------------------------------
const modal = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const buttonClose = document.querySelector('.lightbox__button');
const content = document.querySelector('.lightbox__content');
movieBox.addEventListener('click', openModalOnClick);
  

function openModalOnClick(e) {
    
    e.preventDefault();

    if (!e.target.classList.contains('movie_image')) {
        return;
    }
    document.body.style.overflow = "hidden";
    modal.classList.add('is-open');
    movieApiService.id = +e.target.dataset.index;
    
    window.addEventListener('keydown', closeModalOnEsk);
    buttonClose.addEventListener('click', closeModalOnClick);
    overlay.addEventListener('click', closeModalOnClick);
    fetchMovieById();
    content.addEventListener('click',openTrailer)
  
    content.addEventListener('click', closeTrailer);
    console.log(content)
    console.log(document.querySelector(".plyr__controls"))

}
// window.addEventListener("click", (e) => { e.preventDefault()})
function openTrailer(e) {
     console.log(e.target)
    // e.preventDefault();
    if (e.target.classList.contains("button_open")) {
        e.preventDefault();
        //  const sourse = document.querySelector(".trailer").src;
        // localStorage.setItem("trailerSourse", sourse);
        // let src=localStorage.getItem("trailerSourse", sourse)
            // console.log(document.querySelector(".plyr__video-embed"))
        // document.querySelector(".trailer").style.display = 'block';
        document.querySelector(".video-embed").style.display = 'block';
        //    const player = new Plyr('#player');
        // console.log(player)
       
        // player.play();
        
        // console.log(player.detail.code)
        // document.querySelector(".trailer").style.display = 'block'
        // const player = new Plyr('#player');
        // console.log(player);
        // console.log(document.querySelector(".plyr__controls"))
        // const player = Plyr.setup('.plyr__video-embed');
        // const player = document.getElementById("player");
        // console.log(player)
        //    document.getElementById("player").addEventListener('ready', event => {
        // let instance = event.detail.plyr;
        //        console.log(instance);
        //     //    player.stopVideo();
        //    });
        // const player = Plyr.setup('.plyr__video-embed');
        // player.play();
        
        // const player = document.getElementById("player");
        // console.log(player);
        
         
        // document.querySelector(".trailer").src = src;
        // window.addEventListener("click", (e) => { e.preventDefault() })
        // console.log(document.querySelector(".trailer").src)
       
        // console.log(document.querySelector(".ytp-large-play-button"))
        //    console.log(document.querySelector(".plyr__video-embed"))
            // const backdrop = document.querySelector(".backdrop");
            // backdrop.classList.add("backdrop-is-open");
            // const overlayForTrailer = document.querySelector(".backdrop__overlay");
            // overlayForTrailer.addEventListener("click", closeTrailerOnOverleyClick);
            // const videoTrailer = document.querySelector(".trailer");
            // videoTrailer.addEventListener("click", (e) => { e.preventDefault});
            
        }
   
}


// function closeTrailerOnOverleyClick() {
//     const backdrop = document.querySelector(".backdrop");
//      document.querySelector(".plyr__video-embed").style.display = 'none';
//     backdrop.classList.remove("backdrop-is-open");
//      const videoTrailer = document.querySelector(".trailer");
//             videoTrailer.removeEventListener("click", (e) => { e.preventDefault});
// };

function closeTrailer(e) {
    if(e.target.classList.contains("trailer_button")) {
        document.querySelector(".video-embed").style.display = 'none';
        function  stopPlayerHack(iframe){
             iframe = document.querySelector('#ytplayer');
            let src = iframe.getAttribute('src');
            
    iframe.setAttribute('src', '');
    iframe.setAttribute('src', src);
        }
        stopPlayerHack();
 
   

       
    
       
       
        

        //   player.stopVideo();
        // document.querySelector(".trailer_button").window.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        // const backdrop = document.querySelector(".backdrop");
        // backdrop.classList.remove("backdrop-is-open");
        //  const overlayForTrailer = document.querySelector(".backdrop__overlay");
        // overlayForTrailer.removeEventListener("click", closeTrailerOnOverleyClick);
        // console.log(document.querySelector(".trailer"))
        // const player = Plyr.setup('.trailer');
        // player.pause();


    }
}
function closeModalOnClick() {
   
    modal.classList.remove('is-open');
    document.body.style.overflow = "visible";
    const modalContent = content.firstElementChild;
    modalContent.remove();
    window.removeEventListener('keydown', closeModalOnEsk);
    buttonClose.removeEventListener('click',closeModalOnClick);
    overlay.removeEventListener('click', closeModalOnClick);
    content.removeEventListener('click', closeTrailer);
    content.addEventListener('click',openTrailer)
  
};
 
function closeModalOnEsk(e) {
     if(e.code==="Escape"){
          closeModalOnClick();
     }
};

async function fetchMovieById() {
    const data = await movieApiService.fetchById();
    // console.log(data);
    
    const  {results} = await movieApiService.fetchTrailer()
  let key;
    if(results.length === 0){
        key='W9nZ6u15yis';
        // movieApiService.markupTempl(({ data, key }), content, movieCard);
         content.insertAdjacentHTML("afterbegin", movieCardById({ data,key }));
        Notify.init({ distance:"150px",fontSize:"15px", warning: {background:"#ff6f09",}, }); 
        Notify.warning("Sorry!We dont have a trailer for this movie.");
    }
    else{
        key = results[0].key;
         content.insertAdjacentHTML("afterbegin", movieCardById({ data,key }));
    //   movieApiService.markupTempl(({data,key}), content, movieCard);
    }
    // content.insertAdjacentHTML("afterbegin", movieCardById({ data,key }));
    

}
