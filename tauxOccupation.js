/*Générer une visualisation synthétique du taux d’occupation
des salles*/

const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');
const { parse } = require('path');


function runTauxOccupation() {
//fonction pour la visualisation 
    function recupSalleSeance(parsedMatiere) {
        //recup toute les seances
        var tseances = [];
        for (const matiere of parsedMatiere) {
            for (const seance of matiere.seances) {
                //seance = chaque seance de chaque matiere
                var salleSeance = [seance.salle, seance.crenaux];
                tseances.push(salleSeance);

                var salleSeance = [];
            }

        }
        tseances.sort();
        //console.log(tseances);
        return tseances;
    }

    function getHeureFromCrenaux(crenau) {
        //enlever les 2 premier cara
        var cre = crenau.substring(2);
        //enlever le premier car si c'est un espace
        if (cre[0] === " ") {
            var cre = cre.substring(1);
        }
        if (crenau[0] == " ") {
            var cre = crenau.substring(1);
        }

        return cre;

    }

    function calcTimeCrenaux(crenau) {
        var demiDeb = false;
        var demiFin = false;
        var cre = getHeureFromCrenaux(crenau);
        var deb = 0;
        var fin = 0;

        if (cre[0] == 8 || cre[0] == 9) {
            deb = parseInt(cre[0]);
            if (cre[2] != 0) {
                demiDeb = true;
            }
            var cree = cre.substring(5);
        } else {
            deb = parseInt(cre[0] + cre[1]);
            if (cre[3] != 0) {
                demiDeb = true;
            }
            var cree = cre.substring(6);
        }
        if (demiDeb == true) {
            deb += 0.5
        }

        if (cree[0] == 8 || cree[0] == 9) {
            fin = parseInt(cree[0]);
            if (cree[2] != 0) {
                demiFin = true;
            }
        } else {
            fin = parseInt(cree[0] + cree[1]);
            if (cree[3] != 0) {
                demiFin = true;
            }

        }
        if (demiFin == true) {
            fin += 0.5
        }

        var calc = fin - deb;
        return calc;
    }


    function calcOccupation(parsedMatiere) {
        // on dit qu'une salle peut etre occuper de 8h a 20 h la semaine et de 8h a 12 le samedi ce qui donne 12*7 + 4 soit 88h
        //recup mon tableau [salle, seance]
        var salleSeance = recupSalleSeance(parsedMatiere);
        //console.log(salleSeance);
        var salleOccupation = [];
        for (seance of salleSeance) {
            salleOccupation.push([seance[0], calcTimeCrenaux(seance[1])]);
        }
        var salleVide = [];
        for (salle of salleOccupation) {
            salleVide.push([salle[0]]);
        }
        //console.log(salleVide);
        var salleString = [];
        for (salle of salleVide) {
            salleString.push(salle[0]);
        }

        const salleUnique = [];
        for (salle of salleString) {
            if (!salleUnique.includes(salle)) {
                salleUnique.push(salle);
            }
        }//console.log(typeof(salleUnique[0]));

        var result = [];
        for (let i = 0; i < salleOccupation.length; i++) {
            var index = salleUnique.indexOf(salleOccupation[i][0])
            //result[index] = [salleOccupation[i][0], result[index][1] + salleOccupation[i][1]]
            if (index + 1 > result.length) {
                result.push([salleOccupation[i][0], salleOccupation[i][1]]);
            } else {
                result[index][1] += salleOccupation[i][1];
            }


        }
        //console.log(result);
        return result;
    }


    function tauxOccupation(parsedMatiere) {
        var salleTauxOccupation = calcOccupation(parsedMatiere);
        for (salle of salleTauxOccupation) {
            salle[1] = ((salle[1] * 100) / 88).toFixed(2);
            console.log("la salle : " + salle[0] + " est occupé " + salle[1] + "% du temps");
        }
    }


    function getAllParsedMatiere() {
        var dir = ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST"];
        var parser = new CruParser();
        var allParsedMatiere = [];
        for (file of dir) {
            var chemin = "./sujetA_data/" + file + "/edt.cru";
            var buffer = fs.readFileSync(chemin);
            var data = buffer.toString('utf8');
            parser.parse(data);
            for (matiere of parser.parsedMatiere) {
                allParsedMatiere.push(matiere);
            }
            parsedMatiere = [];
        }
        //console.log(allParsedMatiere);
        return allParsedMatiere;
    }

    var allParsedMatiere = getAllParsedMatiere();

    tauxOccupation(allParsedMatiere);
}

module.exports = { runTauxOccupation };



