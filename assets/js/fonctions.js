/////////////////////////
//   COMMENCER PARTIE  //

function commencerPartie()
{
    containerAccueil.classList.add('cache_accueil');
    containerJeux.classList.add('affiche_jeux');
    userGagne = false;

    // Musique -> Volume = 0.1 // Pause de la musique // Remet la musique à 0
    audio.pause();
    audio.currentTime = 0;

    // Vide champ saisie et focus sur saisie
    saisiePrix.value = '';

    // Initialise nb tentative à 10
    tentative = 10;

    // Affiche indice et tentative
    indice.innerHTML = 'Indice';
    
    //afficheIndice();
    afficheTentative();

    // On appel la fonction pour générer un produit aléatoire
    produitRandom();
}


////////////////////////
//   PRODUIT RANDOM   //

function produitRandom()
{   
    // On random un chiffre par rapport à la longueur du tableau ImageProduit[]
    i = Math.floor(Math.random() * imageProduit.length);

    // Va parcourir le tableau x[] (contient les produits deja affiché)
    for (let y = 0; y < x.length; y++)
    {   
        // Tant que tableau x contient la meme valeur que i 
        while (x.includes(i) == true)
        {
            // On redemande un nouveau produit
            i = Math.floor(Math.random() * imageProduit.length);
        }
    }

    // A chaque random on push le nouveau produit généré
    x.push(i);

    afficheProduit()
}


////////////////////////
//   AFFICHE PRODUIT  //

function afficheProduit()
{
    // Titre produit
    titre.innerHTML = nomProduit[i];

    // Image à afficher
    image.setAttribute('src', imageProduit[i]);
}


///////////////////////////
//   AFFICHE TENTATIVES  //

function afficheTentative()
{
    if (tentative > 1)
    {
        nbTentative.innerHTML = `${tentative} Tentatives Restantes`
    }
    
    else 
    {
        nbTentative.innerHTML = `${tentative} Tentative Restante`;
    }
}


////////////////////////////
//    AFFICHE INDICES    //

function afficheIndice()
{
    if (tentative === 10)
    {
        indice.innerHTML = `Indice: ${plus} ou ${moins}`;
        indice.style.removeProperty('color');
    }

    else if (saisiePrix.value > prixProduit[i])
    { 
        indice.innerHTML = moins;
    }

    else 
    {
        indice.innerHTML = plus;
    }
}


////////////////////////
//    CHECK SUBMIT    //

function checkSubmit()
{
    let saisieUser = saisiePrix.value;
    let prixPrdtAfficher = prixProduit[i];

    // Si saisieUser est égale au prix du produit affiché
    if (saisieUser == prixPrdtAfficher)
    {   
        userGagne = true;

        // On cache element de la saisie
        indice.style.display = 'none';
        nbTentative.style.display = 'none';
        saisiePrix.style.display = 'none';
        soumettrePrix.style.display = 'none';

        // On affice nouveaux éléments
        boutonRejouer.style.display = 'block';
        boutonAccueil.style.display = 'block';

        // On lance animation win
        animWin();
    }

    else 
    {
        if (saisiePrix.value.length > 0 && saisiePrix.value > 0)
        {
            if (tentative > 1)
            {
                tentative = tentative - 1;

                afficheIndice();
                afficheTentative();
            }

            else
            {
                userGagne = false;

                // On cache element de la saisie
                indice.style.display = 'none';
                nbTentative.style.display = 'none';
                saisiePrix.style.display = 'none';
                soumettrePrix.style.display = 'none';

                // On affiche le juste prix
                prix.style.display = 'block';
                prix.innerText = `Perdu :( \nLe Juste Prix est de: ${prixProduit[i]} €`;

                // On affice nouveaux éléments
                boutonRejouer.style.display = 'block';
                boutonAccueil.style.display = 'block';
            }
        }
        saisiePrix.value = '';
    }
}


////////////////////////
//    CHECK SAISIE    //

function checkSaisie()
{
    const r1 = /[0-9]/g;
    const r2 = /[a-z]/i; 
    let saisiePrixUser = saisiePrix.value;

    if (saisiePrixUser.length > 0 && !saisiePrixUser.match(r1) || saisiePrixUser.match(r2)) 
    {
        saisiePrix.style.border = '1px red solid';
    }

    else
    {
        saisiePrix.style.border = '1px #FF8700 solid';
    }
}


////////////////////////
//      REJOUER       //

function rejouer()
{   
    // On enlève animation si user gagne
    if(userGagne === true)
    {
        removeAnimWin();
    }

    userGagne = false;

        // On réattribut 10 tentatives 
        tentative = 10;

        // On affiche les anciens éléments
        indice.style.display = 'block';
        nbTentative.style.display = 'block';
        saisiePrix.style.display = 'block';
        soumettrePrix.style.display = 'block';

        // On cache les nouveaux éléments
        boutonRejouer.style.display = 'none';
        boutonAccueil.style.display = 'none';
        prix.style.display = 'none';

        saisiePrix.value = '';

        if (x.length >= 10)
        {
            alert('Félicitation !\nVous avez devinez tous les produits\nVous allez être rediriger à l\'accueil');
            window.location.reload();
        }
        
        else
        {
            // On génère un nouveau produit
            produitRandom();

            // On affiche les tentatives et indice
            afficheIndice();
            afficheTentative();
        }
}


////////////////////////
//      ANIM WIN      //

function animWin()
{
    const vincentImg = document.createElement('img');
    vincentImg.setAttribute('src', 'assets/img/anim/vincent.png');
    vincentImg.setAttribute('class', 'vincent');

    body.appendChild(vincentImg);

    // Confetti
    body.style.backgroundImage = 'url(\'assets/img/anim/anim.gif\')';
    body.style.backgroundSize = 'cover';
    body.style.backgroundAttachment = 'fixed';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.minHeight = '100vh';

    // Musique 
    audio.volume = 0.1;
    audio.play();
}


////////////////////////
//    REMOVE ANIM     //

function removeAnimWin()
{
    const vincent = document.querySelector('.vincent');
    vincent.style.animation = '.5s toBottom linear';
    setTimeout(function(){body.removeChild(vincent);}, 490);

    // Confetti
    body.style.removeProperty('background-image');
    body.style.removeProperty('background-size');
    body.style.removeProperty('background-attachment');
    body.style.removeProperty('background-repeat');
    body.style.removeProperty('min-height');

    // Musique
    audio.pause();
    audio.currentTime = 0;
}

////////////////////////
//       WINDOW       //

function checkWindow()
{
	width = window.innerWidth;
	height = window.innerHeight;

    //console.log('%cWidth: %c' + width + 'px ' + '%c Height: %c' + height + 'px', 'color: orange; font-variant: small-caps', 'color: yellow', 'color: red; font-variant: small-caps', 'color: lightgreen');

    ////////////////////////
    //     FOR ANDROID    //
    // Lors du click sur input clavier s'ouvre (android), comme valeur du header et container_jeux sont relatif (vh), permet de ne pas remonter les blocs car le vh se réduit a la sortie du clavier
    let viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute("content", "height=" + saveHeight + "px, width=" + saveWidth + "px, initial-scale=1 minimal-scale=1 maximum-scale=1, user-scalable='no'");
}