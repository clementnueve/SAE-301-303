// http://127.0.0.1:5501/master_clean.html?id=%220900845UMKXW%22



//-- imports des programmes nécessaires  --//

import { create as createTaux } from "./tauxViz.js";
import { update as updateTaux } from "./tauxViz.js";
import { create as createCamembert} from "./camembertViz.js";
import { update as updateCamembert } from "./camembertViz.js";
import { create as createFormation} from "./formationViz.js";
import { update as updateFormation } from "./formationViz.js";
import { getDataAttempt } from "./RESTmanagement.js";
console.log("tst 1");

function main() {
  //-- créé les visuels --//
  createTaux();
  createCamembert();
  createFormation();

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
  // updateCamembert(data);
  // updateFormation(data);


  // mise à jour 3 graphes viz x3 ok stv
  //-- Mise à jour de la page de présentation  --//
  //-- Récupération des textes à modifier --//
  const titre_form = document.querySelector(".etiquette-ville");
  const place_form = document.querySelector(".etiquette-places");

  const h1_form = document.getElementById("h1_form");
  const alt_form = document.getElementById("alt_form");
  const lieu_form = document.getElementById("lieu_form");

  //-- Modification des textes --//
  titre_form.textContent = data.results[0]["acad_lib"];
  place_form.textContent = data.results[0]["col"] + " places";

  console.log(titre_form.textContent);
  
  h1_form.textContent = "Master " + data["disciplineMaster"]["2024"];
  alt_form.textContent =
    data["alternancePossible"]["2024"] === "1"
      ? "en alternance"
      : "sans alternance";
  lieu_form.textContent = data["lieuxFormation"]["2024"];
}

//-- point d'entrée de l'application --//
main();