var Matiere = require('./Matiere');
var Seance = require('./Seance');

//parses through the files
//CruParser
var CruParser = function()
{
    this.parsedMatiere = [];
    this.symb = ["+","1","P","H","S"];
    
}

//Parser procedure

//tokenize : tranform file into list
//retourne un tableau chaque elt est ce qui est contenu entre 2 séparateurs
CruParser.prototype.tokenize = function(data)
{
    var separator = /(\r\n|,|=)/;
    data = data.split(separator);
    //dégager les déparateurs du résultat
    data = data.filter((val) => !val.match(separator));
    return data;
}

//parse : analyser les données et lancer le process de création d'objet
CruParser.prototype.parse = function(data)
{
    var tData = this.tokenize(data);
    //console.log(tData);
    this.listMatiere(tData);
}

//checkplus regarde le 1er caractere du 1er elt et regarde si c'est un plus sinon il taige le 1 elt et se rappelle 
CruParser.prototype.checkPlus = function(input)
{
    if(input[0][0] === "+")
    {
        //console.log("+ trouve");
        
        return true; 
    }
    else 
    {
        var taige = input.shift();
        //console.log("on degage : " + taige);
        if(input.length != 0)
        {
            this.checkPlus(input);
        }  
    }return false;
}

//verifie si s est pareil que le 1er elt et shift 1 fois il ne reste plus qu'a ajoute le 1er elt au bonne endroit 
CruParser.prototype.check = function (s, input)
{
    if(s == input[0])
    {
        input.shift();
        return true;
    }else 
    {
        return false;
    }

}


//parser Rules
CruParser.prototype.listMatiere = function(input)
{
    //je check un plus dans le premier elt du string jusqu'a en trouvé 1
    this.checkPlus(input);
    //les deux lignes suivantes c'est pour tej l'exemple de matiere au debut de chaque fichier 
    input.shift();
    this.checkPlus(input);
    //a ce niveua je dois etre pret a choper des matiere 
    this.Matiere(input);
}

CruParser.prototype.Matiere = function(input)
{
    let nomMatiere = input.shift().substring(1);
    var matiere = new Matiere(nomMatiere, []);
    while(input[0] == 1)
    {
        this.seance(input, matiere);
    }
    //console.log(matiere);
    //console.log(input);
    this.parsedMatiere.push(matiere);
    if(input.length > 0 )
    {
        if(this.checkPlus(input))
        {
            this.Matiere(input);
        }
    }
}

CruParser.prototype.seance = function(input, curMat)
{
    if(this.check("1", input))
    {
        t = input.shift();
        if(this.check("P", input))
        {
            var p = input.shift();
            if(this.check("H", input))
            {
                var c = input.shift();
                var g = input.shift();
                if(this.check("S", input))
                {
                    var s = input.shift();
                    var ss = s.substring(0, s.length -2);
                }
            }
        }
    }
    var seance = new Seance(t,p,c,g,ss);
    curMat.addSeance(seance);
   }

module.exports = CruParser;




