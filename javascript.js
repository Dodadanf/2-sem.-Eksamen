let jSonUrl = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kontakt_info/12"
let kontakt = [];

let jSonUrlKollektioner = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kollektioner"
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


//HEADER






// SIDEMENU


async function hentFastIndhold() {

    let headerData = await fetch("header.html");
    let header = await headerData.text();
    document.querySelector(".header").innerHTML = header;

    let footerData = await fetch("footer.html");
    let footer = await footerData.text();
    document.querySelector(".footer").innerHTML = footer;

    let sidemenuData = await fetch("sidemenu.html");
    let sidemenu = await sidemenuData.text();
    document.querySelector(".sidemenu").innerHTML = sidemenu;



    visKontakt();
    visKollektioner();

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
    document.getElementById("myDropdown").classList.toggle("show")
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};



// FOOTER


function visKontakt() {
    document.querySelector("[data-telefonnummer]").textContent = kontakt.acf.telefonnummer;

    document.querySelector("[data-email]").textContent = kontakt.acf.email;

    document.querySelector("[data-adresse]").textContent = kontakt.acf.adresse;

    document.querySelector("[data-aabningstider]").innerHTML = kontakt.acf.åbningstider;

    /*document.querySelector("[data-cvr]").textContent = "Tlf. " + kontakt.acf.cvr;*/
};
