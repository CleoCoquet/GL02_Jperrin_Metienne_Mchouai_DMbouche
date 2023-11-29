var Matiere = require('./Matiere');
var Seance = require('./Seance');


//CruParser
var CruParser = function(sTokenize, sParsedSymb)
{
    this.parsedMatiere = [];
    //a voir pour changer de matiere/ bien les séparer symbole de fin. Page = fin de fichier
    this.symb = ["+","1","P","H","S","Page"];
    this.showTokenize = sTokenize;
    this.showParsedSymbols = sParsedSymb;
}

//Parser procedure

//tokenize : tranform file into list
//retourne un tableau chaque elt est ce qui est contenu entre 2 séparateurs
CruParser.prototype.tokenize = function(data)
{
    var separator = /(\r\n|,|=)/;
    data = data.split(separator);
    //dégager les déparateurs du résultat
    data = data.filter((val, idx) => !val.match(separator));
    return data;
}

//parse : analyser les données et lancer le process de création d'objet
CruParser.prototype.parse = function(data)
{
    var tData = this.tokenize(data);
    console.log(tData);
    this.listMatiere(tData);
}


//lire et retourner le premier symbole de l'input, shift => retire le premier elt de input 
CruParser.prototype.next = function(input)
{
    var curS = input.shift();
    if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS
}

//accept  verifier si le param est dans les symb du parser 
CruParser.prototype.accept = function(s)
{
    var idx = this.symb.indexOf(s);
    if(idx === -1)
    {
        return false;
    }
    return idx;
}

//check  verifier si s est le meme que le premier de ma chaine restante (input)
CruParser.prototype.check = function(s, input)
{
    if(this.accept(s) == this.accept(input[0]))
    {
        return true;
    }
    return false; 
}



//TODO expect
//expect sert a passer un index dans input grace a next et a le comparer au symbole précédent la valeur a garder
CruParser.prototype.expect = function(s, input)
{
    if(s == this.next(input))
    {
        return true;
    }else{

    }
    return false;
}

//parser Rules

//TODO construction des objets
// listeMatiere = *Matiere "Page"
CruParser.prototype.listMatiere = function(input)
{
    this.Matiere(input);
    this.expect("Page", input);
}

//Matiere = "+nomMatiere" *Seance
CruParser.prototype.matiere = function(input)
{
    //ce que j'attend
    if(this.check("+", input[0][0]))
    {
        this.expect("+", input[0]);
        var m = new Matiere(input[0], [])
        //lancé séance qui doit recup les infos de séance crée l'objet et l'ajouté dans matière
        this.seance(input, m);

        //maybe ca ca va dans seance: this.expect("+", input[0]);
        //ajout dans parsed de la matière avec ses séances 
        this.parsedMatiere.push(m);
        //verif si il reste qqlchose si oui on relance cette fonction 
        if(input.lenght > 0)
        {
            this.matiere(input);
        }
        return true;
    }else{
        return false; 
    }
    
    
    
    

} 

CruParser.prototype.seance = function(input)
{

}





