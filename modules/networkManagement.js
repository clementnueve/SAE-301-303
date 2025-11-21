export default function getLastAttempts(start = null) {
    let url = 'http://127.0.0.1:5005/api/attempts';
    if (start !== null) {
        let instant = start.toISOString();
        url += '?start=' + instant;
    }

    return fetch(url)
    .then(function(reponse){
        if (!reponse.ok){
            throw new error('response serveur en erreur:'+ reponse.status);
        }
        return reponse.json();
    })
    .catch((erreur) => {
        console.warn('erreur de récup des tentatives: ' + erreur.message);
        return [];
    })
}