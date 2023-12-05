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
    //enlever les 2 premier cara
    var cre = crenau.substring(2);
    //enlever le premier car si c'est un espace 
    if(cre[0] === " ")
    {
        var cre = cre.substring(1);
    }
    if(crenau[0] == " ")
    {
        var cre = crenau.substring(1);
    }
    
    return cre;
    
}

function calcTimeCrenaux(crenau)
{
    var demiDeb = false;
    var demiFin = false;
    var cre = getHeureFromCrenaux(crenau);
    var deb = 0;
    var fin = 0;
    
    if(cre[0] == 8 || cre[0] == 9)
    {
        deb = parseInt(cre[0]);
        if(cre[2] != 0)
        {
            demiDeb = true;
        }
        var cree = cre.substring(5);
    }
    else{
        deb = parseInt(cre[0]+cre[1]);
        if(cre[3] != 0)
        {
            demiDeb = true;
        }
        var cree = cre.substring(6); 
    }
    if(demiDeb == true){deb += 0.5}
    
    if(cree[0] == 8 || cree[0] == 9)
    {
        fin = parseInt(cree[0]);
        if(cree[2] != 0)
        {
            demiFin = true;
        }
    }
    else{
        fin = parseInt(cree[0]+cree[1]);
        if(cree[3] != 0)
        {
            demiFin = true;
        }
        
    }
    if(demiFin == true){fin += 0.5}
    
    var calc = fin - deb ;
    return calc;
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
    /*var t ="17";
    var i = parseInt(t);
    var c = "2";
    var j = parseInt(c);
    var e = i + j;
    var cre = "abc"
    var deb = cre[0] + cre[1];
    
    if(a[0] === " ")
    {
        console.log("c bon ");
    }*/
    calcTimeCrenaux("MA 10:30-11:30");
    
    
});

