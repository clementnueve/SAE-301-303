# API REST

## GET /api/attempts

Fourni les dernières tentatives de connexions au système bancaire. 
Les tentatives retournées sont celles de la dernière heure ou bien depuis l'instant fourni par le paramètre __start__ le cas échéant.

### Paramètres de recherche

- __start__: instant de départ des tentatives à retourner au format ISO 8601. __Optionnel__.

### Codes de retour possibles 

- __200__ : OK, données retournées.
- __204__ : OK, aucune donnée retournées.
- __400__ : BAD REQUEST, si le paramètre start est invalide ou si l'instant est antérieur à la dernière heure.
- __500__ : SERVER ERROR, erreur interne du serveur.

### Exemple de corps de réponse

```json
[
  [ '2025-09-16T08:20:46.728Z', true, 2, 'W' ],
  [ '2025-09-16T08:20:47.169Z', false, 1, 'W' ],
  [ '2025-09-16T08:20:48.503Z', false, 4, 'W' ],
  [ '2025-09-16T08:20:49.659Z', true, 1, 'W' ]
]
```