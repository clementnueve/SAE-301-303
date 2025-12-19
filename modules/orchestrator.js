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
import { getDataAttempt, getDicoDisciplines, getStatsInsertionForEtabAndDisc } from "./RESTmanagement.js";
console.log("tst 1");

const COMMON_DATA = {
  idFormation: "0900845UMKXW",
  dicoDisciplines: null,
  attemptData: null
};

function main() {
  //-- créé les visuels --//
  createTaux();
  createCamembert();
  createBarre();

  getInitialData();
}

function getInitialData() {
  Promise.all([
    getDataAttempt(COMMON_DATA.idFormation),
    getDicoDisciplines()  
  ]).then(([attemptData, dicoDisciplines]) => {
    COMMON_DATA.attemptData = attemptData;
    COMMON_DATA.dicoDisciplines = dicoDisciplines;
    return getStatsInsertionForEtabAndDisc(
      attemptData.results[0]["eta_uai"],
      dicoDisciplines[Number(attemptData.results[0]["discipline"]).toString()]
    );
  })
  .then((donneesIns) => {
    COMMON_DATA.insData = donneesIns;
    miseajourpage();
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données initiales :", error);
  });
};


/**
 * met a jour les données
 *
 */
function miseajourpage() {
  const data = COMMON_DATA.attemptData;
  const insData = COMMON_DATA.insData;
  console.log('insData', insData);
  updateTaux(data);
  updateCamembert(data);
  updateBarre(insData);


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



  
  // Données salaire

  const salaire_form = document.getElementById("salaire");

(function () {
  const NO_DATA_TEXT = "Aucune donnée sur le salaire";

  const setNoData = () => {
    if (salaire_form) salaire_form.textContent = NO_DATA_TEXT;
  };

  if (!insData) {
    setNoData();
    return;
  }

  const arr = Array.isArray(insData)
    ? insData
    : Array.isArray(insData?.results)
      ? insData.results
      : [];

  if (arr.length === 0) {
    setNoData();
    return;
  }

  const normalized = arr.map(s => {
    let date = null;

    if (s.date) {
      const d = new Date(s.date);
      if (!isNaN(d)) date = d;
    }

    if (!date) {
      const y = s.annee ?? s.year;
      const m = s.mois ?? s.month;
      if (y) date = new Date(Number(y), m ? Number(m) - 1 : 0);
    }

    const salaireRaw =
      s.salaire_net_median_des_emplois_a_temps_plein ??
      s.salaire_net_median ??
      s.salaire_median ??
      s.salaire ??
      null;

    return { date, salaireRaw };
  }).filter(x => x.salaireRaw !== null && x.salaireRaw !== undefined);

  if (normalized.length === 0) {
    setNoData();
    return;
  }

  const chosen = normalized
    .filter(x => x.date instanceof Date && !isNaN(x.date))
    .sort((a, b) => b.date - a.date)[0] || normalized[0];

  const numeric = Number(
    String(chosen.salaireRaw).replace(/[^0-9,.-]/g, "").replace(",", ".")
  );

  if (isNaN(numeric)) {
    setNoData();
    return;
  }

  salaire_form.textContent = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(numeric);
})();

  // Données map


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


}


//-- point d'entrée de l'application --//
main()
