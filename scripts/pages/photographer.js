//Mettre le code JavaScript lié à la page photographer.html



//Constantes
let tableGallery = [];
let selectedPhotographer = [];
let index = 0;


// Fetch photographer

let photographers = fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    let photographers = data.photographers;
    let medias = data.medias;
  





//Fetch médias

async function getMedias() {
    let medias = await fetch("data/photographers.json")
      .then((response) => response.json())
      .then((data) => data.media);
    return medias;
}

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

    ///   ajout des medias ///

    let medias = await getMedias();
    
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

async function init() {
  

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

  ///   ajout des medias ///
let medias = await getMedias();
  
let choosenGallery = medias.filter(
  (item) =>
 // Explore le json et selectionne le média ayant le bon id
  item.photographerId == photographerArtistId
  );
  
  tableGallery = choosenGallery;
  

  displayMedia(choosenGallery, photographers[index]); // construction  pattern factory method
  initTotalLikes(choosenGallery); 
  lightboxFunction();
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


//Action de Filtrage



async function selectLikes() {
  tableGallery.sort((a, b) => b.likes - a.likes);
  console.log (tableGallery);
  displayMedia(tableGallery, photographers[index]);
}

async function selectDates() {
  console.log ("selectDates")
  tableGallery.sort((a, b) => new Date(a.date) - new Date(b.date));
  displayMedia(tableGallery, photographers[index]);
}

async function selectTitles() {
  tableGallery.sort((a, b) => a.title.localeCompare(b.title));
  displayMedia(tableGallery, photographers[index]);
}

// Valide l'action de fitrage lors de la selection

let selectMenu= document.getElementById ("choice-menu");

selectMenu.addEventListener("change", () => {   
  console.log (selectMenu.value);
  switch (selectMenu.value) {
    case "likes":
      selectLikes();
      break;
    case "date":
     selectDates();
      break;
    case "title":
      selectTitles();
      break;
  }

});

})




// LIGHT BOX

function lightboxFunction() {

  let mediaList = document.querySelectorAll(".thumbnail");
  let lightboxBackground = document.querySelector("#lightbox-background");
  let lightboxClose = document.querySelector("#lightbox-close");
  let lightboxPrevious = document.querySelector("#lightbox-previous");
  let lightboxNext = document.querySelector("#lightbox-next");
  let mediaIndex = 0;


  mediaList.forEach((media) => {
    media.addEventListener('keydown', (event) => {
      
      if (event.code == 'Enter') {
      if (media.image){lightboxBackground.querySelector("#imageFS").src = media.src;lightboxBackground.querySelector("#imageFS").focus();}
      else{lightboxBackground.querySelector("#videoFS").src = media.src;
      lightboxBackground.querySelector("#videoFS").setAttribute("controls","true")};
      lightboxBackground.querySelector("#videoFS").focus();
      lightboxBackground.querySelector("#imageFS").src ="";
      let choosenMedia = Array.from(mediaList).find(
        (item) => item.src === media.src
      );
      mediaIndex = Array.from(mediaList).indexOf(choosenMedia);
      lightboxBackground.style.display = "block";
      }

    });
  });

  
  mediaList.forEach((media) => {

    media.addEventListener("click", () => {
      lightboxBackground.querySelector("#imageFS").src = media.src;
      let choosenMedia = Array.from(mediaList).find(
        (item) => item.src === media.src
      );
      mediaIndex = Array.from(mediaList).indexOf(choosenMedia);
      console.log("mediaIndex", mediaIndex);
      lightboxBackground.style.display = "block";
    });

  });





  // fonction previous & next
  
  function PreviousNextInit() {

    if (tableGallery[mediaIndex].image) {
      lightboxBackground.querySelector("#imageFS").src = `assets/photographers_profiles/${selectedPhotographer.name}/${tableGallery[mediaIndex].image}`;
      lightboxBackground.querySelector("#imageFS").alt =
      tableGallery[mediaIndex].title;
      lightboxBackground.querySelector("#videoFS").src = "";
      lightboxBackground.querySelector("#videoFS").removeAttribute("controls");
      lightboxBackground.querySelector("#videoFS").alt = "";
      lightboxBackground.querySelector("#imageFS").display = "flex";
    } else {
      lightboxBackground.querySelector(
        "#videoFS"
      ).src = `assets/photographers_profiles/${selectedPhotographer.name}/${tableGallery[mediaIndex].video}`;
      lightboxBackground.querySelector("#videoFS").alt =
      tableGallery[mediaIndex].title;
      
      lightboxBackground.querySelector("#videoFS").controls = "true";
      lightboxBackground.querySelector("#imageFS").src = "";
      lightboxBackground.querySelector("#imageFS").alt = "";
      lightboxBackground.querySelector("#videoFS").display = "flex";
    }
  }

  function Next() {
    if (mediaIndex < mediaList.length - 1) {
      mediaIndex++;
      PreviousNextInit();
    }
  }

  function Previous() {
    if (mediaIndex > 0) {
      mediaIndex--;
      PreviousNextInit();
    }
  }

  function Close() {
    lightboxBackground.style.display = "none";
  }



  // lancements des events dans la lightbox souris & clavier

  lightboxClose.addEventListener("click", () => {
    Close();
  });
   document.addEventListener("keydown", (event) => {
     if (event.code === "Escape") {
       Close();closeModal();
    }
   });

  lightboxNext.addEventListener("click", () => {
    Next();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      Next();
    }
  });

  lightboxPrevious.addEventListener("click", () => {
    Previous();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      Previous();
    }
  });
}




function initTotalLikes(choosenGallery) {
  let totallikes = 0;
  choosenGallery.forEach((item) => (totallikes += item.likes));

  // console.log("total", totallikes);
  const numberTotalLikes = document.getElementById('all-likes');
  numberTotalLikes.innerText = totallikes;
}

function counterFunction() {
  const allHearts = document.querySelectorAll('.heart-button');
  const numberTotalLikes = document.getElementById('all-likes');

  allHearts.forEach((heart) => {
    const likes = heart.parentElement;
    let likesCount = likes.innerText;
    let totallikes;

    const refreshCount = () => {
      likes.firstElementChild.innerText = likesCount;
      // console.log("likes.firstChild",likes.firstChild);
      // console.log("likes.firstChild.innerText",likes.firstChild.innerText);
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
