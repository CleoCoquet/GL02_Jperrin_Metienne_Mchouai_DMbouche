var Seance = require('./Seance');

var Matiere = function(nomMatiere, seance)
{
    this.nomMatiere = nomMatiere;
    this.seances = [].concat(seance);

}

//TODO addseance

module.exports = Matiere;