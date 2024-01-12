//import des modules ainsi que des fichiers nécéssaires 
const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');

//Fonction pour afficher les salles 
function afficherSalleEtCapacité(matiereInput,parsedMatiere){
    const matiereTrouvee = parsedMatiere.find(matiere => matiere.nomMatiere === matiereInput);

    if (matiereTrouvee) {
        console.log("Informations sur les salles pour la matière", matiereInput, ":");
        
        // Utiliser un ensemble pour stocker les salles déjà affichées
        const sallesDejaAffichees = new Set();

        matiereTrouvee.seances.forEach((seance, index) => {
            // Vérifier si la salle a déjà été affichée
            if (!sallesDejaAffichees.has(seance.salle)) {
                console.log(`Salle ${seance.salle}, Capacité ${seance.nbPlace}`);
                
                // Ajouter la salle à l'ensemble des salles déjà affichées
                sallesDejaAffichees.add(seance.salle);
            }
        });
    } else {
        console.log("Matière non trouvée.");
    }
}
//Fonction chemin pour changer le chemin en fonction de la matière

function genererChemin(matiere){
    var dir = ["AB","CD","EF","GH","IJ","KL","MN","OP","QR","ST"];
    const premiereLettre=matiere[0]
    const dossierTrouve=dir.find(dossier => dossier.includes(premiereLettre))
    if (dossierTrouve) {
        return `./sujetA_data/${dossierTrouve}/edt.cru`;
    } else {
        console.log("Matière non trouvée");
        return null;
    }

}

// Crée une interface de lecture
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function runAfficheSalle(){
// Demande à l'utilisateur de saisir le nom de la matière
rl.question('Entrez le nom de la matière : ', (matiereInput) => {
    const chemin = genererChemin(matiereInput);
    fs.readFile(chemin, 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur de lecture du fichier :", err);
            return;
        }

        const parser = new CruParser();
        parser.parse(data);

        // Appelle la fonction pour afficher les salles
        afficherSalleEtCapacité(matiereInput, parser.parsedMatiere);

        // Ferme l'interface de lecture
        rl.close();
    });
})};
module.exports = {runAfficheSalle};