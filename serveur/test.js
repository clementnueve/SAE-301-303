async function getLastAttemps(start=null) {
  try {
    const params = new URLSearchParams();
    if (start) {
      params.append('start', start.toISOString());
    }
    let url = 'http://localhost:5005/api/attempts';
    if (params.size > 0) {
      url += '?' + params.toString();
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur serveur lors du chargement des academie (code ${reponse.status}).`);
    }
    return response.json();
  } catch (e) {
    console.log(`Net error: ${e}.`);
    throw e;
  }
}

console.log('Test get lastAttemps');
getLastAttemps(new Date(Date.now() - 2*60*1000)).then((res) => {
  console.log('Done !');
  console.log(res);
}, (err) => {
  console.warn('Error', err);
})