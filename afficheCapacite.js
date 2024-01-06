//import des modules ainsi que des fichiers nécéssaires 
const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');

function trouverCapacitePourSalle(salleInput, parsedMatiere) {
    const dir = ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST"];

    for (const dossier of dir) {
        const chemin = `./sujetA_data/${dossier}/edt.cru`;

        try {
            const data = fs.readFileSync(chemin, 'utf8');
            const parser = new CruParser();
            parser.parse(data);

            // Parcours des matières pour trouver la salle
            for (const matiere of parser.parsedMatiere) {
                for (const seance of matiere.seances) {
                    if (seance.salle === salleInput) {
                        console.log(`Capacité maximale de la salle ${salleInput} : ${seance.nbPlace}`);
                        return;  // Arrêter la recherche dès que la salle est trouvée
                    }
                }
            }
        } catch (err) {
            // Gérer l'erreur (par exemple, le fichier n'existe pas)
            console.error(`Erreur lors de la lecture du fichier ${chemin}:`, err);
        }
    }
    console.log(`Salle ${salleInput} non trouvée.`);
}


module.exports = trouverCapacitePourSalle;


function runAfficheCapacite() {

// Crée une interface de lecture
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

// Demande à l'utilisateur de saisir le nom de la salle
    rl.question('Entrez le nom de la salle : ', (salleInput) => {

        // Appelle la fonction pour trouver la capacité de la salle
        trouverCapacitePourSalle(salleInput, []);

        // Ferme l'interface de lecture
        rl.close();
    });
}