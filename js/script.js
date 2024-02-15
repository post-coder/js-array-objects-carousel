/*
Milestone 0:
Come nel primo carosello realizzato,
 focalizziamoci prima sulla creazione del markup statico: 
 costruiamo il container e inseriamo l'immagine grande 
 in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali 
per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, 
la nuova immagine attiva diventerà visibile 
e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.


BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
*/


const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, 
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];




console.log(images);


// bersagliamo lo slider
const sliderElement = document.getElementById("slider");

// salvo il contenitore delle antemprime
const thumbnailsElement = document.querySelector("#thumbnails");


// tramite un ciclo for prendiamo ogni indirizzo delle immagini dall'array
images.forEach(function(currentImage, index) {
    // di volta in volta il currentImage diventa un elemento singolo diverso
    // dell'array "images"
    // quindi in questo caso UN OGGETTO

    // inserisco l'elemento html dentro lo slider
    // per ognuno di essi andremo a creare un elemento img dentro lo slider
    sliderElement.innerHTML += `    
    <section class="slide">

        <img src="./${currentImage.image}" alt="immagine ${index + 1}">

        <div class="details">

            <h3 class="title">
                ${currentImage.title}
            </h3>

            <div class="text">
                ${currentImage.text}
            </div>
        
        </div>
        
    </section>
    `;

    // console.log(currentImage)

    // inserisco l'anteprima dentro l'elemento #thumbnails
    thumbnailsElement.innerHTML += `
    <div class="thumb">
        <img src="./${currentImage.image}" alt="anteprima ${index + 1}">
    </div>
    `;  
});


// questa riga aggiunge la classe active al primo elemento
showSlide(1);


/*
-  salvo un contatore della slide
-  QUANDO premo la freccia SU
    - prendo l'immagine attuale e le rimuovo la classe "active"  
    - aumento il contatore di 1
    - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
*/


// -  salvo un contatore della slide
let slideNumber = 1;

// -  QUANDO premo la freccia SU
document.querySelector("#right-arrow").addEventListener("click", function() {

    

    if (slideNumber < images.length) {

        // - aumento il contatore di 1
        slideNumber++;

        showSlide(slideNumber);


    } else {

        slideNumber = 1;

        showSlide(slideNumber);
    }
});


// premo la freccia giù
document.querySelector("#left-arrow").addEventListener("click", function() {

    if (slideNumber > 1) {

        slideNumber--;

        showSlide(slideNumber);


    } else {

        // - metto il valore di slideNumebr = alla posizione dell'ultima immagine
        slideNumber = images.length;

        showSlide(slideNumber);
    }
    


});


// gestione click delle thumbnail
// fare in modo che tutte le thumbnail abbiano un addEventListener
// al click di una thumbnail verrà attivata la slide corrispondente
// (cliccando sulla SECONDA thumbnail verrà mostrata la SECONDA slide)

// ripeschiamo dal nostro document tutte le thumbnail
const thumbnailsElements = document.querySelectorAll("#thumbnails .thumb");


thumbnailsElements.forEach(((currentThumbnail, index) => {

    // quando clicchiamo su una thumbnail
    currentThumbnail.addEventListener("click", () => {

        slideNumber = index + 1;
        

        showSlide(slideNumber);
        // viewThumbnail(currentThumbnail, index)


    })

}));


function viewThumbnail(currentThumbnail, index) {
    // le arrow function cambiano il this
    // il this dentro le arrow function è sempre la window
    
    // non utilizzando una arrow function
    // il mio this rappresenta la thumbnail cliccata
    
    // come faccio a capire il numero di questa thumbnail?



    
    // rimuovere la classe active dalla slide precedente
    // so quale sia la slide precedente perchè il suo numero è segnato nella variabile "slideNumber"
    // mi tocca quindi aggiornare questo numero
    document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.remove("active");


    // rimuovo la classe active da tutte le anteprime
    thumbnailsElements.forEach((thumb => {
        thumb.classList.remove("active");
    }))
    // aggiungo la classe active solo all'anteprima cliccata
    currentThumbnail.classList.add("active")




    // quando clicchiamo su un'anteprima
    // la slide che corrisponde alla stessa posizione dell'anteprima (index)
    // deve avere la classe "active"
    document.querySelector(`#slider .slide:nth-of-type(${index + 1})`).classList.add("active");
    // dentro "index" so quale sia la posizione dell'anteprima

}


function showSlide(number) {
    // number -> slide da mostrare e anteprima collegata
    
    // codice per mostrare la slide corretta

    // rimuoviamo la classe "active" da tutte le altre slide

    // ci metto tutte le slide 
    const slides = document.querySelectorAll(".slide");
    slides.forEach(currentSlide => {
        currentSlide.classList.remove("active")
    }) 

    // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
    document.querySelector(`#slider .slide:nth-of-type(${number})`).classList.add("active");



    // codice per mostrare la thumbnail corretta

    // prendere tutte le anteprime e rimuovere la classe active
    const thumbs = document.querySelectorAll(".thumb");
    thumbs.forEach(thumb => {
        thumb.classList.remove("active");
    })

    document.querySelector(`.thumb:nth-of-type(${number + 1})`).classList.add("active");
}