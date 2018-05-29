let jSonUrlKollektioner = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kollektioner"
let kollektioner = [];

document.addEventListener("DOMContentLoaded", hentJsonSidemenu);

async function hentJsonSidemenu() {


    let dataJsonKollektioner = await fetch(jSonUrlKollektioner);

    kollektioner = await dataJsonKollektioner.json();

    visKollektioner();
};

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




/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show2");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn2')) {

        var dropdowns = document.getElementsByClassName("dropdown-content2");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show2')) {
                openDropdown.classList.remove('show2');
            }
        }
    }
};
