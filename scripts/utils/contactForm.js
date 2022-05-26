function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


//MODALE

// Première partie open close
// ___________________________________________________________________________________________________________________________________
// DOM constants definitions
const formularyData = document.querySelectorAll('.formData');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const message = document.querySelector('#textarea');
const formError = document.querySelector('.formError');
const dataSent = document.querySelector('.data-sent');
const modalbg = document.querySelector('.bground');
const formulary = document.querySelector('form');
const close = document.querySelector('.close'); // constante qui récupère l'élément correspondant à la croix
const btnClose = document.querySelector('.btn-close');
const modalTitle = document.querySelector('#modal-title');
const firstname = document.querySelector('#first');

// launch modal form and reset data
function launchModal() {
  modalbg.style.display = 'block';
  const artistNameH2 = document.querySelector('#artist-name'); // DOM h2 demandé ici car pas construit avant l'exécution des scripts
  modalTitle.innerHTML = 'Contactez-moi' + `\n${artistNameH2.textContent}`; // \n saut de ligne
  formulary.reset();
  formulary.style.display = 'block'; // pour être sûr que le formulaire s'affiche dans tous les cas
  dataSent.style.display = 'none'; // pour supprimer message d'envoi des données si nous voulons faire un autre enregistrement
  for (let step = 0; step < 3; step++) {
    formularyData[step].removeAttribute('data-error-visible');
  } // pour supprimer les bordures par défaut au lieu du rouge ou du bleu
  firstname.focus();
}


// fonction permettant de fermer la modale en cliquant sur la croix
function closeModal() {
  modalbg.style.display = 'none';
}

// attendre un clic sur la classe close puis lancer la fonction closeModal
close.addEventListener('click', closeModal);


// Deuxième partie validation
// ___________________________________________________________________________________________________________________________________

// Regex const definition
const regexName = /^[a-zA-Z-\s]+$/;
const regexEmail = /([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})/;

// Pour empêcher la soumission par défaut du formulaire et permettre à notre fonction de validation de le vérifier en premier
formulary.addEventListener('submit', (e) => {
  e.preventDefault();
  validate();
});

// écoute de la saisie au clavier pour aider le client

firstName.addEventListener('input', (e) => {
  const { value } = e.target;
  if (value.trim().length >= 2 && regexName.test(value)) {
    formularyData[0].setAttribute('data-error-visible', 'false');
  } else {
    formularyData[0].setAttribute('data-error-visible', 'true');
  }
});

lastName.addEventListener('input', (e) => {
  const { value } = e.target;
  if (value.trim().length >= 2 && regexName.test(value)) {
    formularyData[1].setAttribute('data-error-visible', 'false');
  } else {
    formularyData[1].setAttribute('data-error-visible', 'true');
  }
});

email.addEventListener('input', (e) => {
  const { value } = e.target;
  if (regexEmail.test(value)) {
    formularyData[2].setAttribute('data-error-visible', 'false');
  } else {
    formularyData[2].setAttribute('data-error-visible', 'true');
  }
});

// La grande fonction de validation qui teste toutes les valeurs d'entrée
function validate() {
  let numberOfErrors = 0;

  if (firstName.value.trim().length >= 2 && regexName.test(firstName.value)) {
    formularyData[0].setAttribute('data-error-visible', 'false');
  } else {
    formularyData[0].setAttribute('data-error-visible', 'true');
    numberOfErrors++;
  }

  if (lastName.value.trim().length >= 2 && regexName.test(lastName.value)) {
    formularyData[1].setAttribute('data-error-visible', 'false');
  } else {
    formularyData[1].setAttribute('data-error-visible', 'true');
    numberOfErrors++;
  }

  if (regexEmail.test(email.value)) {
    formularyData[2].setAttribute('data-error-visible', 'false');
  } else {
    formularyData[2].setAttribute('data-error-visible', 'true');
    numberOfErrors++;
  }

  if (numberOfErrors > 0) {
    formError.style.opacity = '1';
  } else {
    formulary.style.display = 'none';
    dataSent.style.display = 'flex';
  }

  // consolelog qui affiche le contenu des champs remplis par le visiteur, dans la modale
  console.log(
    'contenu des champs du formulaire de contact :',
    firstName.value,
    lastName.value,
    email.value,
    message.value
  );
} 
