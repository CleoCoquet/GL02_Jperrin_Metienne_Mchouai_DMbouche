//import des modules ainsi que des fichiers nécéssaires 
const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');

var classement = [];
let i =0;
c=0;

function trouverCapacitePourSalle(parsedMatiere) {
    //Fonction pour récupérer les valeurs du CruParser et les mettre dans un tableau
    for (const matiere of parsedMatiere) {
        for (const seance of matiere.seances) {
            classement[i] = [];
            let a = seance.salle;
            let b = seance.crenaux;
            classement[i][0] = a;
            classement[i][1] = b;
            i++;
        }
    }

    //ressort les salles ayant des problèmes d'horaire avec les index des lignes impliquées
    for (let i = 0; i < classement.length; i++) {
        for (let j = 1; j < classement.length; j++) {
            if (classement[i][0] === classement[j][0] && classement[i][1] === classement[j][1] && i < j) {
                console.log("Problème d'horaire pour la salle " + classement[j][0] + " => " + i + " => " + j);
            }
        }
    }
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