
const fs = require('fs');
const readlineSync = require('readline-sync');
const CruParser = require('./CruParser');

function runDispoCrenaux() {
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


function isHoraireChevauche(horaire1, horaire2) {
    const [jour1, heures1] = horaire1.split(' ');
    const [jour2, heures2] = horaire2.split(' ');

    if (jour1 !== jour2) {
        return false;
    }

    const [debut1, fin1] = heures1.split('-');
    const [debut2, fin2] = heures2.split('-');

    // Vérifier si les horaires se chevauchent
    return (
        (debut1 <= debut2 && fin1 > debut2) ||
        (debut1 < fin2 && fin1 >= fin2) ||
        (debut1 >= debut2 && fin1 <= fin2)
    );
}

function trouverSallesDisponibles(tseances, horaireUtilisateur) {
    const [jour, horaires] = horaireUtilisateur.split(' ');

    // Filter out occupied time slots during the specified day and time
    const sallesOccupees = tseances
        .filter(([salle, creneaux]) => {
            // Convert creneaux to an array if it's a string
            const creneauxArray = typeof creneaux === 'string' ? [creneaux] : creneaux;
            return creneauxArray.some(creneau => isHoraireChevauche(creneau, `${jour} ${horaires}`));
        })
        .map(([salle]) => salle);

    // Get unique available rooms
    const sallesDisponibles = [...new Set(tseances.map(([salle]) => salle))]
        .filter(salle => !sallesOccupees.includes(salle));

    return sallesDisponibles;
}



// Appel de la fonction pour récupérer les données
const parsedMatiere = getAllParsedMatiere();

// Appel de la fonction pour traiter les données
const tseances = recupSalleSeance(parsedMatiere);

// Demander à l'utilisateur de saisir l'horaire de manière synchrone
const horaireUtilisateur = readlineSync.question("Entrez l'horaire (par exemple, 'J 14:00-16:00') : ");

// Obtenir les salles disponibles pour l'horaire spécifié
const sallesDisponibles = trouverSallesDisponibles(tseances, horaireUtilisateur);

// Afficher les résultats
if (sallesDisponibles.length > 0) {
    console.log(`Salles disponibles pour l'horaire ${horaireUtilisateur} :`);
    console.log(sallesDisponibles);
} else {
    console.log(`Aucune salle disponible pour l'horaire ${horaireUtilisateur}.`);
}}
module.exports = runDispoCrenaux;
