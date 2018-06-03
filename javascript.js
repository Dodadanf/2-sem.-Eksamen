let jSonUrlKontakt = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kontakt_info/12";
let kontakt = [];

let jSonUrlKurser = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kurser";

let kurser = [];

let jSonUrlKollektioner = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kollektioner";
let kollektioner = [];

let jSonUrlForside = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/forside_content/343";


document.addEventListener("DOMContentLoaded", hentJson);



// ASYNC FUNCTIONS - HENT INDHOLD

async function hentJson() {

    let dataJsonKurser = await fetch(jSonUrlKurser);
    kurser = await dataJsonKurser.json();

    let dataJsonKontakt = await fetch(jSonUrlKontakt);
    kontakt = await dataJsonKontakt.json();

    let dataJsonKollektioner = await fetch(jSonUrlKollektioner);
    kollektioner = await dataJsonKollektioner.json();

    let dataJsonForside = await fetch(jSonUrlForside);
    forside = await dataJsonForside.json();

    hentFastIndhold();

};

async function hentFastIndhold() {

    var mq = window.matchMedia('all and (max-width: 1024px)');

    let headerData = await fetch("header.html");
    let header = await headerData.text();


    let footerData = await fetch("footer.html");
    let footer = await footerData.text();
    document.querySelector(".footer").innerHTML = footer;

    let nyhedsbrevData = await fetch("nyhedsbrev.html");
    let nyhedsbrev = await nyhedsbrevData.text();
    document.querySelector("#nyhedsbrev_container").innerHTML = nyhedsbrev;

    document.querySelector("[data-nyhedsbrev]").addEventListener("click", openPopup);

    document.querySelector("[data-adresse-ikon").addEventListener("click", openPopupAdresse);


    if (mq.matches) {
        console.log("mobilmenu");

        document.querySelector(".burgermenu_container").innerHTML = header;
        document.querySelector("[data-logo]").style.backgroundImage = "url(" + forside.acf.logo.url + ")";


    } else {

        document.querySelector(".header").innerHTML = header;
        document.querySelector("[data-logo]").style.backgroundImage = "url(" + forside.acf.logo.url + ")";

    }

    visFooter();
    /*visMenu();*/
    burgermenu();

}

//Åben modal/popup

function openPopup() {

    document.querySelector(".popup").style.visibility = "visible";
    // igen bruges class istedet for data-, da man skal ændre stylingen
    document.querySelector("[data-closebutton]").addEventListener("click", closePopup);
}

function closePopup() {
    document.querySelector(".popup").style.visibility = "hidden";
}

function openPopupAdresse() {
    document.querySelector(".popup_adresse").style.visibility = "visible";
    // igen bruges class istedet for data-, da man skal ændre stylingen
    document.querySelector("[data-closebutton-adresse]").addEventListener("click", closePopupAdresse);
}

function closePopupAdresse() {
    document.querySelector(".popup_adresse").style.visibility = "hidden";
}


/*function visMenu() {
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

};*/

/*function visMenu2() {
    kurser.forEach(kursus => {

        let display = document.querySelector("[data-menu2]");
        let template = document.querySelector("[data-menutemplate]");
        let klon = template.cloneNode(true).content;

        kursus.querySelector("[data-link]").textContent = kurser.acf.kursus_navn;
        kursus.querySelector("[data-link]").addEventListener("click", () => {
            location.href = "produkter.html?kollektion=" + kurser.acf.kollektionens_url_input;
        });
        display.appendChild(klon);

    });

};*/


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

function myFunction2() {
    document.getElementById("myDropdown").classList.toggle("showSidemenu")
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn2')) {

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
        document.querySelector(".burgermenu_container").classList.toggle("show");
    }
}



// FOOTER


function visFooter() {


    //        document.querySelector("[data-telefonnummer]").textContent = kontakt.acf.telefonnummer;

    document.querySelector("[data-gade]").textContent = kontakt.acf.adresse;
    document.querySelector("[data-postnr]").textContent = kontakt.acf.postnr_by;
    document.querySelector("[data-land]").textContent = kontakt.acf.land;

    document.querySelector("[data-adresse-ikon]").src = kontakt.acf.logo.url;

    document.querySelector("[data-aabningstider]").innerHTML = kontakt.acf.åbningstider;

    document.querySelector("[data-cvr]").textContent = "CVR: " + kontakt.acf.cvr;
};
