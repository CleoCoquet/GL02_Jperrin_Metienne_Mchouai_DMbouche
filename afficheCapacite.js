//import des modules ainsi que des fichiers nécéssaires 
const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');

function trouverCapacitePourSalle(salleInput, parsedMatiere) {
    for (const matiere of parsedMatiere) {
        for (const seance of matiere.seances) {
            if (seance.salle === salleInput) {
                console.log(`Capacité maximale de la salle ${salleInput} : ${seance.nbPlace}`);
                return;  // Arrêter la recherche dès que la salle est trouvée
            }
        }
    }
    console.log(`Salle ${salleInput} non trouvée.`);
}

const chemin = "./sujetA_data/ST/edt.cru";

// Crée une interface de lecture
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Demande à l'utilisateur de saisir le nom de la salle
rl.question('Entrez le nom de la salle : ', (salleInput) => {
    fs.readFile(chemin, 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur de lecture du fichier :", err);
            return;
        }

        const parser = new CruParser();
        parser.parse(data);

        // Appelle la fonction pour trouver la capacité de la salle
        trouverCapacitePourSalle(salleInput, parser.parsedMatiere);

        // Ferme l'interface de lecture
        rl.close();
    });
});