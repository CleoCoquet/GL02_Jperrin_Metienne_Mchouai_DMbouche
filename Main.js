//write a main function to call the different functions in the other files
//call the files
const calendrier = require('./calendrier');
const dispoSalle = require('./dispoSalle');
const afficheSalle = require('./afficheSalle');
const classementSalle = require('./classementSalle');
const cruParser = require('./CruParser');
const dispoCrenaux = require('./dispoCrenaux');
const afficheCapacite = require('./afficheCapacite');
const matiere = require('./Matiere');
const fs = require('fs');
const readlineSync = require('readline-sync');


//create a main

console.log("Bienvenue dans l'application de gestion des salles de SRU");
console.log("Veuillez choisir une option :");
//create a menu with options: search for rooms of a course,get capacity of a room, search for free rooms or free slots, export a calendar
console.log("1. Rechercher les salles d'un cours");
console.log("2. Obtenir la capacité d'une salle");
console.log("3. Rechercher les salles libres");
console.log("4. Rechercher les créneaux libres");
console.log("5. Exporter un calendrier");
console.log("6. Quitter");
