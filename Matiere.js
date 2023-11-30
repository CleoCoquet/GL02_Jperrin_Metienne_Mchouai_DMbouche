var Seance = require('./Seance');

var Matiere = function(nomMatiere, seances)
{
    this.nomMatiere = nomMatiere;
    this.seances = [].concat(seances);

}

//addSeance permet d'ajouter une séance a la matière
Matiere.prototype.addSeance = function(seance)
{
    this.seances.push(seance);
};

module.exports = Matiere;