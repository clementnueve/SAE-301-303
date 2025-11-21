# SAE-301-303
Présentation : 
Le site propose une présentation de l’offre, ainsi qu’une mise en valeur originale des candidatures et de l’insertion professionnelle grâce à des indicateurs visuels. Des visualisations, réparties de manière harmonieuse au sein de la présentation du master, rassemblent toutes les informations essentielles sur la formation. L’internaute peut interagir avec ces visualisations afin de filtrer et d’affiner les données affichées.

Schéma de conception : 
<img width="1920" height="1080" alt="Schéma conception" src="https://github.com/user-attachments/assets/2f644021-97e7-4ef9-8596-cc095ce80f41" />


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


TauxViz.js : updateTauxViz()
Paramètre : Responsable de l'actualisation de l'affichage du graphique à barres et des informations supplémentaires sur le côté (aucuns paramètres).



CamembertViz.js : createCamembertViz()
Paramètre : 

Schéma : 



CamembertViz.js : updateCamembertViz()
Paramètre : Responsable de l'actualisation de l'affichage du camembert et des informations supplémentaires sur le côté (aucuns paramètres).



AdmisViz.js : createFormationViz()
Paramètre : 

Schéma : 



AdmisViz.js : updateFormationViz()
Paramètre : Responsable de l'actualisation de l'affichage de la jauge et des informations supplémentaires sur le côté (aucuns paramètres).


FormationViz.js : createFormationViz()
Paramètre : 

Schéma : 



FormationViz.js : updateFormationViz()
Paramètre : Responsable de l'actualisation de l'affichage du radar et des informations supplémentaires sur le côté (aucuns paramètres).


CacheManagement.js : getAttempts()
Paramètre : 



CacheManagement.js : addAttempts()
Paramètre : 



CacheManagement.js : getSettings()
Paramètre : 



CacheManagement.js : addSetings()
Paramètre : 



APIRestManagement.js : getLastAttempts()
Paramètre : 


