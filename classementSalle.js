//import des modules ainsi que des fichiers nécéssaires 
const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');

var classement = [];
let i =0;
c=0;

//Fonction pour récupérer les valeurs du CruParser 
function trouverCapacitePourSalle(parsedMatiere) {
    for (const matiere of parsedMatiere) {
        for (const seance of matiere.seances) {
            classement[i] = [];
            let a = seance.salle;
            let b = seance.nbPlace;
            classement[i][0] = a;
            classement[i][1] = b;
            i++;
        }
    }

    //Retirer les doublons salle/nbPlaces identiques
    let stringArray = classement.map(JSON.stringify);
    let uniqueStringArray = new Set(stringArray);
    classement = Array.from(uniqueStringArray, JSON.parse);

    //Afficher le tableau trié 
    console.table(classement.sort((a,b)=>{
        return a[1] - b[1];
    }));
}

const chemin = "./sujetA_data/ST/edt.cru";

// Demande à l'utilisateur de saisir le nom de la salle
    fs.readFile(chemin, 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur de lecture du fichier :", err);
            return;
        }

        const parser = new CruParser();
        parser.parse(data);

        // Appelle la fonction pour trouver la capacité de la salle
        trouverCapacitePourSalle(parser.parsedMatiere);
    });