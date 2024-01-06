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
const edtConforme = require('./edtConforme');
const tauxOccupation = require('./tauxOccupation');
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
console.log("6. classemnt des salles");
console.log("7. edt conforme");
console.log("8. taux occupation");
console.log("9. Quitter");


// create a switch case to call the different functions
let choix = readlineSync.question("Votre choix : ");
switch (choix) {
    case "1":
        console.log("Vous avez choisi de rechercher les salles d'un cours");
        afficheSalle.runAfficheSalle();
        break;
    case "2":
        console.log("Vous avez choisi d'obtenir la capacité d'une salle");
        afficheCapacite.runAfficheCapacite();
        break;
    case "3":
        console.log("Vous avez choisi de rechercher les salles libres");
        dispoSalle.runDispoSalle();
        break;
    case "4":
        console.log("Vous avez choisi de rechercher les créneaux libres");
        dispoCrenaux.runDispoCrenaux();
        break;
    case "5":
        console.log("Vous avez choisi d'exporter un calendrier");
        calendrier.runCalendrier();
        break;
    case "6":
        console.log("Vous avez choisi le classement des salles");
        classementSalle.runClassementSalle();
        break;
    case "7":
        console.log("Vous avez choisi l'edt conforme");
        edtConforme.runedtConforme();
        break;
    case "8":
        console.log("Vous avez choisi le taux d'occupation");
        tauxOccupation.runTauxOccupation();
        break;
    default:
        console.log("Veuillez choisir une option valide");
        break;
}