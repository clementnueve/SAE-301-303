const express = require('express');
const qs = require('qs');
const cors = require('cors');
const { generateRndAttempsFromStart } = require('./dataGeneration');

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 5005;

const CORS_CONFIG = {
  origin: /^https?:\/\/(localhost|127\.0\.0\.1):?\d*$/,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
app.use(cors(CORS_CONFIG));
app.set('query parser', (str) => qs.parse(str, {
  depth: 0,
  parameterLimit: 5
}))


app.get('/api/attempts', async (req, res) => {
  // Vérifie la présence d'un paramètre de requête ts et l'analysel le cas échéant
  const minStartBound = new Date(Date.now() - 30 * 60 * 1000);
  let start = null;
  if (req.query.start) {
    start = new Date(req.query.start);
    if (isNaN(start)) {
      res.status(400).send('Invalid start query param.');
      res.end();
      return;
    } else if (start < minStartBound) {
      res.status(400).send('Too old start query param.');
      res.end();
      return;
    }
  } else {
    start = minStartBound;
  }
  try {
    res.set('Content-Type', 'application/json');
    // res.set('Transfer-Encoding', 'chunked');
    res.write('[');
    let multipleElements = false;
    for await (const attempt of generateRndAttempsFromStart(start ?? minStartBound)) {
      if (multipleElements) {
        res.write(',');
      } else {
        multipleElements = true;
      }
      res.write(JSON.stringify(attempt, null, 0));
    }
    res.write(']');
  } catch (error) {
    console.warn("Server error: ", error);
    res.status(500).send(error.message);
  } finally {
    // Dans tous les cas, on ferme la réponse
    res.end();
  }
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Serveur prête, en écoute sur http://${SERVER_HOST}:${SERVER_PORT}.`); //eslint-disable-line no-console
});
