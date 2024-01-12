
const readlineSync = require('readline-sync');
const fs = require('fs');
const CruParser = require('./CruParser');

function runDispoSalle() {
function getAllParsedMatiere() {
    var dir = ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST"];
    var parser = new CruParser();
    var allParsedMatiere = [];

    for (const file of dir) {
        var chemin = "./sujetA_data/" + file + "/edt.cru";
        var buffer = fs.readFileSync(chemin);
        var data = buffer.toString('utf8');
        parser.parse(data);

        for (const matiere of parser.parsedMatiere) {
            allParsedMatiere.push(matiere);
        }

        parser.parsedMatiere = [];
    }
    return allParsedMatiere;
}

function recupSalleSeance(parsedMatiere) {
    var tseances = [];
    for (const matiere of parsedMatiere) {
        for (const seance of matiere.seances) {
            var salleSeance = [seance.salle, seance.crenaux];
            tseances.push(salleSeance);
        }
    }
    tseances.sort();
    return tseances;
}

// Appel de la fonction pour récupérer les données
const parsedMatiere = getAllParsedMatiere();

// Appel de la fonction pour traiter les données
const tseance = recupSalleSeance(parsedMatiere);

// Demander à l'utilisateur de saisir le nom de la salle de manière synchrone
const salleUtilisateur = readlineSync.question("Entrez le nom de la salle : ");

// Vérifier si la salle est valide
const salleExistante = tseance.some(([salle]) => salle === salleUtilisateur);

if (salleExistante) {
    // Obtenir les créneaux indisponibles pour la salle spécifiée
    const creneauxIndisponibles = trouverCreneauxIndisponibles(tseance, salleUtilisateur);

    // Afficher les résultats
    console.log(`Créneaux horaires indisponibles pour la salle ${salleUtilisateur} :`);
    console.log(creneauxIndisponibles);
} else {
    console.log(`La salle ${salleUtilisateur} n'a pas été trouvée dans le planning.`);
}

function trouverCreneauxIndisponibles(planningSalle, salleCible) {
    const creneauxIndisponibles = new Set();

    for (const [salle, creneau] of planningSalle) {
        if (salle === salleCible) {
            creneauxIndisponibles.add(creneau);
        }
    }

    return Array.from(creneauxIndisponibles);
}}
module.exports = { runDispoSalle };