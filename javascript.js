let jSonUrl = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kontakt_info/12";
let kontakt = [];

let jSonUrlKollektioner = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kollektioner";
let kollektioner = [];


document.addEventListener("DOMContentLoaded", hentJson);



// ASYNC FUNCTIONS - HENT INDHOLD

async function hentJson() {

    let dataJson = await fetch(jSonUrl);
    kontakt = await dataJson.json();

    let dataJsonKollektioner = await fetch(jSonUrlKollektioner);

    kollektioner = await dataJsonKollektioner.json();

    hentFastIndhold();

};

async function hentFastIndhold() {

    var mq = window.matchMedia('all and (max-width: 900px)');

    let headerData = await fetch("header.html");
    let header = await headerData.text();
    document.querySelector(".header").innerHTML = header;
    document.querySelector("[data-logo]").style.backgroundImage = "url("+kontakt.acf.logo.url+")";

    let footerData = await fetch("footer.html");
    let footer = await footerData.text();
    document.querySelector(".footer").innerHTML = footer;

    let nyhedsbrevData = await fetch("nyhedsbrev.html");
    let nyhedsbrev = await nyhedsbrevData.text();
    document.querySelector("#nyhedsbrev").innerHTML = nyhedsbrev;

    document.querySelector("[data-nyhedsbrev]").addEventListener("click", openPopup);


    if (mq.matches) {
        console.log("mobilmenu");
        let sidemenuData = await fetch("mobilmenu.html");

        console.log(sidemenuData.text);

        //        let sidemenu = await sidemenuData.text();
        //        document.querySelector(".sidemenu").innerHTML = sidemenu;
        //
    } else {
        //        let sidemenuData = await fetch("sidemenu.html");
        //        let sidemenu = await sidemenuData.text();
        //        document.querySelector(".sidemenu").innerHTML = sidemenu;
    }


    visKontakt();
    visKollektioner();
    burgermenu();

}

//Åben modal/popup

function openPopup() {

    document.querySelector(".popup").style.visibility = "visible";
    // igen bruges class istedet for data-, da man skal ændre stylingen

//    document.querySelector("[data-billede]").src = sliderImageMenukort;
//    document.querySelector("[data-billede]").alt = "billede af" + " " + sliderImageMenukort;
}



document.querySelector("[data-close-button]").addEventListener("click", closePopup);

function closePopup() {
    document.querySelector(".popup").style.visibility = "hidden";


}

function visKollektioner() {
    kollektioner.forEach(kollektion => {

        let display = document.querySelector("[data-menu]");
        let template = document.querySelector("[data-menutemplate]");
        let klon = template.cloneNode(true).content;

        klon.querySelector("[data-link]").textContent = kollektion.acf.kollektionens_navn;
        klon.querySelector("[data-link]").addEventListener("click", () => {
            location.href = "produkter.html?kollektion=" + kollektion.acf.kollektionens_url_input;
        });
        display.appendChild(klon);

    });

};


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("showSidemenu")
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('showSidemenu')) {
                openDropdown.classList.remove('showSidemenu');
            }
        }
    }
};


function burgermenu() {

    console.log("burgermenu");
    document.querySelector(".burgermenu").addEventListener("mouseover", burgerFarveskiftOver);

    document.querySelector(".burgermenu").addEventListener("mouseout", burgerFarveskiftOut)

    document.querySelector(".burgermenu").addEventListener("click", toggleBurgermenu);

    function burgerFarveskiftOver() {
        document.querySelector(".bar1").classList.add("farveskift");
        document.querySelector(".bar2").classList.add("farveskift");
        document.querySelector(".bar3").classList.add("farveskift");
    }

    function burgerFarveskiftOut() {
        document.querySelector(".bar1").classList.remove("farveskift");
        document.querySelector(".bar2").classList.remove("farveskift");
        document.querySelector(".bar3").classList.remove("farveskift");
    }

    function toggleBurgermenu() {
        document.querySelector(".burgermenu").classList.toggle("change");
        document.querySelector(".burgermenu").classList.toggle("skrump");
        document.querySelector(".sidemenu").classList.toggle("show");
    }
}



// FOOTER


function visKontakt() {
    document.querySelector("[data-telefonnummer]").textContent = kontakt.acf.telefonnummer;

    document.querySelector("[data-email]").textContent = kontakt.acf.email;

    document.querySelector("[data-gade]").textContent = kontakt.acf.adresse;
    document.querySelector("[data-postnr]").textContent = kontakt.acf.postnr_by;
    document.querySelector("[data-land]").textContent = kontakt.acf.land;

    document.querySelector("[data-aabningstider]").innerHTML = kontakt.acf.åbningstider;

    document.querySelector("[data-cvr]").textContent = "CVR: " + kontakt.acf.cvr;
};
