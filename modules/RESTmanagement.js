
/**
* Récupère les données des écoles et formation. la promesse retournée
* n'échoue jamais et contiendra toujours un tublequ de tentatives,
* possiblement vide
@returns
*/

export function getDataAttempt() {

    let baseURL =
        "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-mon_master/records";

    let idFormation = "'1601861D3NAY'";
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("id") != null) {
        idFormation = urlParams.get("id");
    }

    console.log(idFormation);
    
    

    return (
        fetch(baseURL + "?where=ifc=" + idFormation)

            .then((answer) => {
                if (!answer.ok) {
                    throw new Error("Erreur d'accès aux tentatives : " + answer.status);
                }
                return answer.json();
            })
    );
}