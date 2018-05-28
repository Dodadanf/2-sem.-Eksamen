let jSonUrl = "http://ecorporation.dk/kea/2_semester/opgaver/eksamen/wordpress/wp-json/acf/v3/kontakt_info/12"
let kontakt = [];

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let dataJson = await fetch(jSonUrl);
    kontakt = await dataJson.json();

    visKontakt();
};


function visKontakt() {
    document.querySelector("[data-telefonnummer]").textContent = kontakt.acf.telefonnummer;

    document.querySelector("[data-email]").textContent = kontakt.acf.email;

    document.querySelector("[data-adresse]").textContent = kontakt.acf.adresse;

    document.querySelector("[data-aabningstider]").innerHTML = kontakt.acf.åbningstider;

    document.querySelector("[data-cvr]").textContent = "Tlf. " + kontakt.acf.cvr;
};
