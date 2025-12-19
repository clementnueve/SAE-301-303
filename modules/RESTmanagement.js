
/**
* Récupère les données des écoles et formation. la promesse retournée
* n'échoue jamais et contiendra toujours un tublequ de tentatives,
* possiblement vide
@returns
*/

export function getDicoDisciplines() {
    return fetch('https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/secteurs-disciplinaires')
        .then((resp) => {
            return resp.json();
        }).then((listDisc) => {
            return listDisc.reduce((dico, discipline) => {
                if (dico[discipline.disciplineId]) {
                    dico[discipline.disciplineId].push(discipline.insDiscId);
                } else {
                    dico[discipline.disciplineId] = [discipline.insDiscId];
                }
                return dico;
            }, {});
        });
}

export function getDataAttempt(idFormation) {
    let baseURL =
        "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-mon_master/records";

    // default sans guillemets
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("id") != null) {
        idFormation = urlParams.get("id");
    }

    console.log('ID reçu (raw):', idFormation);

    // Normaliser : retirer guillemets éventuels fournis dans l'URL
    const normalized = String(idFormation).replace(/^['"]|['"]$/g, '');
    const whereClause = `ifc='${normalized}'`;

    return fetch(baseURL + "?where=" + encodeURIComponent(whereClause))
        .then((answer) => {
            if (!answer.ok) {
                throw new Error("Erreur d'accès aux tentatives : " + answer.status);
            }
            return answer.json();
        });
}

export async function getStatsInsertionForEtabAndDisc(etabID, discsIns) {
    const urlBase = "https://tabular-api.data.gouv.fr/api/resources/a27a4212-6732-408e-85e4-819ce897046b/data/";
    const searchParams = new URLSearchParams({
        numero_de_l_etablissement__exact: etabID,
        code_de_la_discipline__in: discsIns
    });

    const tabStartIns = [];
    let currentURL = `${urlBase}?${searchParams.toString()}`;
    do {
        const res = await fetch(currentURL);
        const stats = await res.json();
        tabStartIns.push(...stats.data);
        if (stats.links.next) {
            currentURL = stats.links.next;
        } else {
            currentURL = null;
        }
    } while (currentURL !== null);
    return tabStartIns
}


/**
 * Recherche des formations par IFC ou par texte (nom de formation / université).
 * @param {string} searchTerm
 * @param {string} zone (optionnel) — filtre sur l'académie / zone
 * @returns {Promise<object>} résultat JSON de l'API (ou {results:[]} en cas d'erreur)
 */
export function searchFormations(searchTerm, zone = "") {
    const baseURL =
        "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-mon_master/records";

    if (!searchTerm || typeof searchTerm !== 'string') {
        return Promise.resolve({ results: [] });
    }

    const term = searchTerm.trim();
    let whereClause = '';

    // Détecte un IFC probable (suite alphanumérique, longueur >= 6)
    if (/^[A-Z0-9]{6,}$/i.test(term)) {
        // mettre entre guillemets
        const quoted = '"' + term + '"';
        whereClause = `ifc=${quoted}`;
    } else {
        // Recherche texte : échappe les apostrophes et fait une recherche insensible à la casse
        const esc = term.replace(/'/g, "''").toLowerCase();
        whereClause = `(lower(disci_master) LIKE '%${esc}%' OR lower(eta_nom) LIKE '%${esc}%')`;
    }

    if (zone && zone.trim() !== '') {
        const z = zone.trim().replace(/'/g, "''").toLowerCase();
        whereClause += ` AND lower(acad_lib) LIKE '%${z}%'`;
    }

    const url = baseURL + '?where=' + encodeURIComponent(whereClause);
    return fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error('Recherche API failed: ' + res.status);
            return res.json();
        })
        .catch((err) => {
            console.error('searchFormations error', err);
            return { results: [] };
        });
}