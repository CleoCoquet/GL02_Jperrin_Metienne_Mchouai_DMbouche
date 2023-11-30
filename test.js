var Matiere = require('./Matiere');
var Seance = require('./Seance');
var CruParser = require('./CruParser');
var fs = require('fs');

//exemple pour avoir un tableau de donnée d'un seul fichier .cru
// ici j'ai pris ST vous pouver choisir dans le chemin en remplacant ST par un autre nom de dossier 

var chemin = "./sujetA_data/ST/edt.cru";
fs.readFile(chemin, 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur de lecture du fichier :", err);
      return;
    }
    //on instancie un parser
    var parser = new CruParser();
    //on lance le parsing
    parser.parse(data);

    //vous avez les données dans parsedMatiere 
    var premiere_matiere_du_fichier = parser.parsedMatiere[0];
    console.log(premiere_matiere_du_fichier);
  

});


// a noter que je sais pas comment sortir les données du fs.readfile donc vous devez rester dedans si vous avez besoin des données 
