Présentation : 
Le site propose une présentation de l’offre, ainsi qu’une mise en valeur originale des candidatures et de l’insertion professionnelle grâce à des indicateurs visuels. Des visualisations, réparties de manière harmonieuse au sein de la présentation du master, rassemblent toutes les informations essentielles sur la formation. L’internaute peut interagir avec ces visualisations afin de filtrer et d’affiner les données affichées.

Index.html : 
Dans le champ de recherche, veuillez inscrire un code IFC indépendante à chaque formation pour arriver sur la formation que vous désirez.

Schéma de conception : 
![](images/Schémavf.png)

Déploiement : 
Orchestrator.js - Main() : 
Paramètres : aucun. Il s’agit de la fonction centrale du site, exécutée dès son lancement et constituant le point de départ du fonctionnement global. Chronologiquement, elle peut :
Appeler la fonction chargée de récupérer les paramètres d’affichage de l’internaute et déclencher la création des visualisations au moment du chargement du site.


Surveiller en continu les actions réalisées par l’internaute.


Appeler les fonctions responsables de la mise à jour des visualisations en fonction des interactions de l’utilisateur.


Appeler la fonction de sauvegarde des paramètres d’affichage à chaque modification effectuée par l’internaute.


BarreViz.js : createBarreViz()

Paramètre : Fonction responsable de l'affichage initial du graphique à barres, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher des barres (colonnes) en fonction des données.
Afficher les données sur le côté.


Schéma : 


BarreViz.js : updateBarreViz()
Paramètre : Responsable de l'actualisation de l'affichage du graphique à barres et des informations supplémentaires sur le côté (aucuns paramètres).



CamembertViz.js : createCamembertViz()
Paramètre : Fonction responsable de l'affichage initial du graphique en camembert, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher des sections du graph en fonction des données.
Afficher les données sur le côté.

Schéma : 



CamembertViz.js : updateCamembertViz()
Paramètre : Responsable de l'actualisation de l'affichage du camembert et des informations supplémentaires sur le côté (aucuns paramètres).



TauxViz.js : createTauxViz()
Paramètre : Fonction responsable de l'affichage initial du graphique en jauges, avec l'aide de l'API de Apache Echarts.
Récupérer les données nécessaires à l'aide de ce que fournit getAttemps().
Afficher la valeur en pourcentage en fonction des données.
Afficher les données sur le côté.

Schéma : 



TauxViz.js : updateTauxViz()
Paramètre : Responsable de l'actualisation de l'affichage de la jauge et des informations supplémentaires sur le côté (aucuns paramètres).



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

Bugs connus : 
Dans la page master, certaines données peuvent ne pas s’afficher si ces dernières ne sont pas présentes. Elles sont alors représentées soient par un champ vide ou alors par un “0” pour le salaire.



