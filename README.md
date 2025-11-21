# SAE-301-303
Présentation : 
Le site propose une présentation de l’offre, ainsi qu’une mise en valeur originale des candidatures et de l’insertion professionnelle grâce à des indicateurs visuels. Des visualisations, réparties de manière harmonieuse au sein de la présentation du master, rassemblent toutes les informations essentielles sur la formation. L’internaute peut interagir avec ces visualisations afin de filtrer et d’affiner les données affichées.

Schéma de conception : 
<img width="1211" height="913" alt="Schéma conception" src="https://github.com/user-attachments/assets/b5c7543a-1e6e-4481-ad54-8e6f0b2e7134" />


Déploiement : 
Orchestrator.js - Main() : 
Paramètres : aucun. Il s’agit de la fonction centrale du site, exécutée dès son lancement et constituant le point de départ du fonctionnement global. Chronologiquement, elle peut :
Appeler la fonction chargée de récupérer les paramètres d’affichage de l’internaute et déclencher la création des visualisations au moment du chargement du site.


Surveiller en continu les actions réalisées par l’internaute.


Appeler les fonctions responsables de la mise à jour des visualisations en fonction des interactions de l’utilisateur.


Appeler la fonction de sauvegarde des paramètres d’affichage à chaque modification effectuée par l’internaute.


TauxViz.js : createTauxViz()

Paramètre : Fonction responsable de l'affichage initial du graphique à barres, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher des barres (colonnes) en fonction des données.
Afficher les données sur le côté.


Schéma : 
<img width="461" height="366" alt="image" src="https://github.com/user-attachments/assets/e8629b8d-e979-41a9-9b1c-dc79cba563a1" />


TauxViz.js : updateTauxViz()
Paramètre : Responsable de l'actualisation de l'affichage du graphique à barres et des informations supplémentaires sur le côté (aucuns paramètres).



CamembertViz.js : createCamembertViz()
Paramètre : Fonction responsable de l'affichage initial du graphique en camembert, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher des sections du graph en fonction des données.
Afficher les données sur le côté.

Schéma : 
<img width="431" height="436" alt="image" src="https://github.com/user-attachments/assets/919e7fb4-8c7c-43f2-8d09-d69dd2e4548e" />



CamembertViz.js : updateCamembertViz()
Paramètre : Responsable de l'actualisation de l'affichage du camembert et des informations supplémentaires sur le côté (aucuns paramètres).



AdmisViz.js : createFormationViz()
Paramètre : Fonction responsable de l'affichage initial du graphique en jauges, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher la valeur en pourcentage en fonction des données.
Afficher les données sur le côté.

Schéma : 
<img width="414" height="437" alt="image" src="https://github.com/user-attachments/assets/fdbe8f0c-94b4-410b-940d-8cd4597f0c51" />



AdmisViz.js : updateFormationViz()
Paramètre : Responsable de l'actualisation de l'affichage de la jauge et des informations supplémentaires sur le côté (aucuns paramètres).


FormationViz.js : createFormationViz()
Fonction responsable de l'affichage initial du graphique en radar, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher les points en fonction des données.
Afficher les données sur le côté.

Schéma : 
<img width="486" height="429" alt="image" src="https://github.com/user-attachments/assets/6e04397a-ef09-4e7a-80bd-36973f59bb6d" />



FormationViz.js : updateFormationViz()
Paramètre : Responsable de l'actualisation de l'affichage du radar et des informations supplémentaires sur le côté (aucuns paramètres).


CacheManagement.js : getAttempts()
Aucuns paramètre. Fonction permettant de récupérer les tentatives stockées en cache.
Fonctionnalités : Faire appel au Local Storage pour récupérer les tentatives.



CacheManagement.js : addAttempts()
Fonction permettant d'ajouter ou de mettre à jour les tentatives dans le cache.
Fonctionnalités : Enregistrer les nouvelles tentatives dans le Local Storage.


CacheManagement.js : getSettings()
Aucuns paramètre. Exécutée grâce à main(), cette fonction est responsable de la récupération des paramètres de l'utilisateur.
Fonctionnalités :
Faire appel au Local Storage pour récupérer les informations nécessaires.
Appeler les fonctions d'actualisation des visualisations pour appliquer les paramètres de l'utilisateur dès le chargement du site.



CacheManagement.js : addSetings()
Exécutée grâce à main(), cette fonction est responsable de l'actualisation et de la sauvegarde des paramètres de l'utilisateur.
Fonctionnalités : Enregistrer les nouveaux paramètres dans le Local Storage.



RestManagement.js : getLastAttempts()
Fonction permettant de récupérer les dernières tentatives via l'API REST. Effectuer un appel à l'API REST pour obtenir et transmettre les dernières tentatives.


Actualisation : 
D’autres fonctionnalités, meilleur fonctionnement du projet sont prévu dans les prochaines semaines (à partir du 21/11/2025).

Bugs connus : 
Etant actuellement dans une phase de prototypage, certains bugs sont présents dans le projet.

