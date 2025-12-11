// http://127.0.0.1:5501/master_clean.html?id=%220900845UMKXW%22



//-- imports des programmes nécessaires  --//

import { create as createTaux } from "./tauxViz.js";
import { update as updateTaux } from "./tauxViz.js";
import { create as createCamembert } from "./camembertViz.js";
import { update as updateCamembert } from "./camembertViz.js";
import { update as updateRadar } from "./radarViz.js";
import { create as createRadar } from "./radarViz.js";
import { create as createBarre } from "./barreViz.js";
import { update as updateBarre } from "./barreViz.js";
import { getDataAttempt } from "./RESTmanagement.js";
console.log("tst 1");

function main() {
  //-- créé les visuels --//
  createTaux();
  createCamembert();
  createRadar();
  createBarre();

  getData();
}

function getData() {
  let tab = "";
  
  getDataAttempt().then((results) => {
    tab = results;
    
    console.log(tab);
    
    miseajourpage(tab);
  });
  
};


/**
 * met a jour les données
 *
 */
function miseajourpage(data) {
  updateTaux(data);
  updateCamembert(data);
  updateRadar(data);
  updateBarre(data);


  // mise à jour 3 graphes viz x3 ok stv
  //-- Mise à jour de la page de présentation  --//
  //-- Récupération des textes à modifier --//
  const nom_form = document.querySelector("#master-titre");
  const univ_form = document.querySelector("#etablissement-nom");
  const ville_form = document.querySelector("#etiquette-ville");
  const place_form = document.querySelector("#etiquette-places");
  const adresse_form = document.querySelector("#adresse-texte");
  const alt_form = document.querySelector("#etiquette-alternance");

  const candidature_form = document.querySelector("#nbr-candidature");
  const admis_form = document.querySelector("#nbr-admis");
  const places_form = document.querySelector("#nbr-places");
  const dernier_form = document.querySelector("#dernier-admis");

  const admisFemme_form = document.querySelector("#nbr-admis-femmes");
  const admisHommes_form = document.querySelector("#nbr-admis-hommes");

  const logUniv = document.getElementById("logo-univ");
  const eta_uai = data.results[0]["eta_uai"];
  // Changer univ-effeil par une image de logo inconnu
  const urlLogo = eta_uai ? `https://monmaster.gouv.fr/api/logo/${eta_uai}` : './img/logo-carré.svg';
  logUniv.setAttribute('src', urlLogo);

  
  //-- Modification des textes --//
  ville_form.textContent = data.results[0]["acad_lib"];
  place_form.textContent = data.results[0]["col"] + " places";
  adresse_form.textContent = data.results[0]["lieux"];
  nom_form.textContent = data.results[0]["disci_master"];
  univ_form.textContent = data.results[0]["eta_nom"];
  var alternanceVal = data.results && data.results[0] ? data.results[0]["alternance"] : data["alternance"];
  alt_form.textContent = (alternanceVal == "1" || alternanceVal === 1)
      ? "Alternance disponible"
      : "Alternance non disponible";

  candidature_form.textContent = data.results[0]["n_can_pc"] + data.results[0]["n_can_pp"];
  admis_form.textContent = data.results[0]["n_accept_total"];
  places_form.textContent = data.results[0]["col"];
  dernier_form.textContent = data.results[0]["rang_dernier_appele_pc"];

  admisFemme_form.textContent = data.results[0]["n_accept_femme_pp"] + data.results[0]["n_accept_femme_pc"];
  admisHommes_form.textContent = data.results[0]["n_accept_total"] - (data.results[0]["n_accept_femme_pp"] + data.results[0]["n_accept_femme_pc"]);

  // // Charger et afficher les suggestions basées sur la discipline
  // const discipline = data.results[0]["disci_master"];
  // const currentIfc = data.results[0]["ifc"];
  // if (discipline) {
  //   loadAndDisplaySuggestions(discipline, currentIfc);
  // }

  console.log("Données reçues :", data);
  // Gestion de la map
  const balise_map = document.getElementById("carte");
  console.log("Adresse reçues :", data.results[0]["lieux"]);
  if (balise_map) {
            // if (data && data.adresse) {
                const adresseEncodee = encodeURIComponent(data.results[0]["lieux"]);
                console.log("Adresse reçues :", adresseEncodee);
                balise_map.src = `https://maps.google.com/maps?q=${adresseEncodee}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
            // } else {
            //     console.warn("Adresse manquante pour la carte");
            //     balise_map.style.display = "none";
            // }
        }

  console.log(ville_form.textContent);
  console.log(adresse_form.textContent);


}

//-- point d'entrée de l'application --//
main()