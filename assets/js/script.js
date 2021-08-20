const body = document.querySelector('body');

/////////////////////////
//  CONTAINER ACCUEIL  //

const logo = document.getElementById('logo');
const containerAccueil = document.querySelector('.container_accueil');
const boutonCommencer = document.querySelector('.bouton_commencer');
const audio = document.querySelector('audio');
audio.volume = 0.1;

logo.addEventListener('click', ()=>{document.location.reload();});
boutonCommencer.addEventListener('click', commencerPartie);


////////////////////////
//   CONTAINER JEUX   //

const containerJeux = document.querySelector('.container_jeux');
const titre = document.querySelector('.titre');
const image = document.querySelector('.image');
const saisieDiv = document.querySelector('.saisie');
const nbTentative = document.querySelector('.nombre_tentative');
const indice = document.querySelector('.indice');
const plus = '<span style="color: green">Plus</span>';
const moins = '<span style="color: red">Moins</span>';
const prix = document.querySelector('.prix');
const formulaire = document.querySelector('.formulaire_saisie_prix');
const saisiePrix = document.querySelector('.saisie_prix');
const soumettrePrix = document.querySelector('.soumettre_prix');
const imageProduit = ['assets/img/produits/bain_pied.png', 'assets/img/produits/cafetiere.png', 'assets/img/produits/chaise_bureau.png', 'assets/img/produits/corbeille.png', 'assets/img/produits/handspinner.png', 'assets/img/produits/lampe_sel.png', 'assets/img/produits/machine_popcorn.png', 'assets/img/produits/matelas.png', 'assets/img/produits/perceuse.png', 'assets/img/produits/rectoprojecteur.png', 'assets/img/produits/souris.png'];
const nomProduit = ['Un Bain de Pied Massant', 'Une Cafetière Filtre', 'Une Chaise de Bureau', 'Une Corbeille à Papier', 'Un Handspinner', 'Une Lampe à Sel - 5kg', 'Une Machine à Popcorn', 'Un Matelas Gonflable - 2 personnes', 'Perceuse / Viseuse Sans-Fil', 'Un Rectoprojecteur', 'Une Souris Gaming'];
const prixProduit = [47, 25, 89, 16, 14, 36, 51, 60, 151, 99, 85];
const boutonRejouer = document.querySelector('.bouton_rejouer');
const boutonAccueil = document.querySelector('.bouton_accueil');

let userGagne;

// On crée un tableau pour stocker les produits déjà affichés
let x = new Array();

boutonAccueil.addEventListener('click', function(){window.location.reload();});
boutonRejouer.addEventListener('click', rejouer);
saisiePrix.addEventListener('input', checkSaisie);
formulaire.addEventListener('submit', function(e)
{
    // Evite refresh de la page au clique du bouton 'soumettre'
    e.preventDefault();
    checkSubmit();
});


////////////////////////
//       WINDOW       //

const saveWidth = window.innerWidth;
const saveHeight = window.innerHeight;
window.addEventListener('resize', checkWindow);