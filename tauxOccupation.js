/*Générer une visualisation synthétique du taux d’occupation
des salles*/

const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');
const { parse } = require('path');



//fonction pour la visualisation 
function recupSalleSeance(parsedMatiere)
{
    //recup toute les seances 
    var tseances = [];
    for(const matiere of parsedMatiere)
    {
        for(const seance of matiere.seances)
        {
            //seance = chaque seance de chaque matiere 
            var salleSeance = [seance.salle, seance.crenaux];
            tseances.push(salleSeance);
            
            var salleSeance = [];
        }
        
    }
    tseances.sort();
    //console.log(tseances);
}

function getHeureFromCrenaux(crenau)
{
    return crenau.substring(crenau.length - 11);
}

function calcTimeCrenaux(crenau)
{
    
}
{

}
function calcOccupation(parsedMatiere)
{
    // on dit qu'une salle peut etre occuper de 8h a 20 h la semaine et de 8h a 12 le samedi ce qui donne 12*7 + 4 soit 88h 
    //recup mon tableau [salle, seance]
    var salleSeance = recupSalleSeance(parsedMatiere);
    for(seance of salle)
    {

    }
}


function tauxOccupation(parsedMatiere)
{
    


}
var chemin = "./sujetA_data/ST/edt.cru";
// affichage du taux d'occupation 
fs.readFile(chemin, 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur de lecture du fichier :", err);
        return;
    }

    const parser = new CruParser();
    parser.parse(data);

    // Appelle la fonction pour afficher le taux d'occupation 
    //tauxOccupation(parser.parsedMatiere);
    //var t ="MA 17:00-19:00"
    //console.log(getHeureFromCrenaux(t));
});

