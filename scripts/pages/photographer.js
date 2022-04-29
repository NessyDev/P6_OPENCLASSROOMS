//Mettre le code JavaScript lié à la page photographer.html



//Constantes
let tableGallery = [];
let selectedPhotographer = [];
let index = 0;


// Fetch photographer + medias

let photographers = fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    let photographers = data.photographers;
    let medias = data.medias;
  

//Fonctions

async function init() {

  
  // recherche de l'id dans la barre d'adresse:
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const photographerArtistId = urlParams.get("id");

    selectedPhotographer = photographers.find(
        (item) => item.id == photographerArtistId
    );

    
    index = photographers.indexOf(selectedPhotographer);

    let content = document.getElementById("photograph-header");
    content.appendChild(photographerHeader(photographers[index]));

   
    
   let choosenGallery = medias.filter(
        (item) =>
     // on parcourt les medias du json et on ne retient que ceux ayant le bon id
        item.photographerId == photographerArtistId
    );

    
   

}

init();




//Infos du photographe dans le Header 

function photographerHeader(photographer) {
    let photographerProfile = document.createElement("article");
    let profilePicture = document.createElement("img");
    let photographerName = document.createElement("h2");
    let localisation = document.createElement("p");
    let tagline = document.createElement("p");
    let price = document.getElementById("price");
  
    price.textContent = `${photographer.price}€ / jour`;
    profilePicture.src = `assets/photographers/${photographer.portrait}`;
    profilePicture.alt = photographer.name;
    photographerName.id = "artist-name";
    photographerName.textContent = photographer.name;
    localisation.textContent = `${photographer.city}, ${photographer.country}`;
    localisation.id = "localisation";
    tagline.id = "tagline";
    tagline.textContent = photographer.tagline;
  
    photographerProfile.appendChild(profilePicture);
    photographerProfile.appendChild(photographerName);
    photographerProfile.appendChild(localisation);
    photographerProfile.appendChild(tagline);
  
    return photographerProfile;
}

 //   Affichage des médias

 class Media {
  constructor(media, photographer) {
    this.media = media;
    this.mediaContent = document.querySelector("#gallery");
    this.photographer = photographer;
    

    if (this.media.image) {
      this.image();
    } else if (this.media.video) {
      this.video();
    }
  }

  init(media) {
    this.mediaContent.insertAdjacentHTML(
      "beforeend",
      `<article>
      ${media}
      <div class="cardtext">
        <h2>${this.media.title}</h2>
        <div class = "likes">
        <span class = "likes-number">${this.media.likes}</span>
        <button
        class="heart-button unliked" style='background-image: url("assets/icons/dark_red_heart.svg");'>
        </button>
        </div>
      </div>
    </article>`
    );
  }

  image() {
    this.image = `<img class="thumbnail" src= "assets/photographers_profiles/${this.photographer.name}/${this.media.image}" alt="${this.media.title}" tabindex="0">`;
    this.init(this.image);
  }

  video() {
    this.video = `<video class="thumbnail" src= "assets/photographers_profiles/${this.photographer.name}/${this.media.video}" title="${this.media.title}" controls = "true" tabindex="0"></video>`;
    this.init(this.video);
  }
}

//création des vignettes dans la galerie

let displayMedia = (mediaArray, photographer) => {
  let gallery = document.getElementById ("gallery");
  gallery.innerHTML = "";
  mediaArray.forEach((media) => {
    new Media(media, photographer);
  });
};



//Fonction qui lance les tâches à effectuer

function init() {
  

// recherche de l'id dans la barre d'adresse
let queryParams = window.location.search;
let urlParams = new URLSearchParams(queryParams);
const photographerArtistId = urlParams.get("id");

console.log(photographers)
selectedPhotographer = photographers.find(
(item) => item.id == photographerArtistId
);

  
index = photographers.indexOf(selectedPhotographer);

let content = document.getElementById("photograph-header");
content.appendChild(photographerHeader(photographers[index]));



  
let choosenGallery = medias.filter(
  (item) =>
 // Explore le json et selectionne le média ayant le bon id
  item.photographerId == photographerArtistId
  );
  
  tableGallery = choosenGallery;
  

  displayMedia(choosenGallery, photographers[index]); // construction  pattern factory method
  initTotalLikes(choosenGallery); 
  counterFunction(); 
  
 
}
// FILTRAGE DES MÉDIAS

//Déclaration des fonctions

function initTotalLikes(choosenGallery) {
  let totallikes = 0;
  choosenGallery.forEach((item) => (totallikes += item.likes));

  // console.log("total", totallikes);
  const numberTotalLikes = document.getElementById('all-likes');
  numberTotalLikes.innerText = totallikes;
}

function counterFunction() {
  const allHearts = document.querySelectorAll('.heart-button');
  const numberTotalLikes = document.getElementById('');

  allHearts.forEach((heart) => {
    const likes = heart.parentElement;
    let likesCount = likes.innerText;
    let totallikes;

    const refreshCount = () => {
      likes.firstElementChild.innerText = likesCount;
      numberTotalLikes.innerText = totallikes;
    };

    heart.addEventListener('click', () => {
      if (heart.classList.contains('unliked')) {
        // console.log("il y a eu un click");
        totallikes = Number(numberTotalLikes.innerText); // pour initialiser
        heart.classList.remove('unliked');
        heart.style.backgroundImage = 'url(assets/icons/light_red_heart.svg)';
        likesCount++;
        // console.log(likesCount);
        totallikes++;
      } else {
        // console.log("il y a eu un deuxième click");
        heart.classList.add('unliked');
        heart.style.backgroundImage = 'url(assets/icons/dark_red_heart.svg)';
        likesCount--;
        // console.log(likesCount);
        totallikes--;
      }
      refreshCount();
    });
  });
}

//Action de Filtrage



async function selectLikes() {
  tableGallery.sort((a, b) => b.likes - a.likes);
  console.log (tableGallery);
  displayMedia(tableGallery, photographers[index]);
}

async function selectDates() {
  tableGallery.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  await rebuildGallery();
}

async function selectTitles() {
  tableGallery.sort((a, b) => a.title.localeCompare(b.title));
  await rebuildGallery();
}

// Valide l'action de fitrage lors de la selection

let selectMenu= document.getElementById ("choice-menu");

selectMenu.addEventListener("change", () => {   
  console.log (selectMenu.value);
  switch (selectMenu.value) {
    case "likes":
      selectLikes();
      break;
    case "dates":
     selectDates();
      break;
    case "title":
      selectTitles();
      break;
  }

});

})
