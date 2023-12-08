/*générer un fichier iCalendar (RFC 5545) pour les
enseignements auxquels ils participent, entre deux dates
spécifiques*/
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');
const fs = require('fs');


function getAllParsedMatiere()
{
    var dir = ["AB","CD","EF","GH","IJ","KL","MN","OP","QR","ST"];
    var parser = new CruParser();
    var allParsedMatiere = [];
    for(file of dir)
    {
        var chemin = "./sujetA_data/"+file+"/edt.cru";
        var buffer = fs.readFileSync(chemin);
        var data = buffer.toString('utf8');
        parser.parse(data);
        for(matiere of parser.parsedMatiere)
        {
            allParsedMatiere.push(matiere);
        }
        parsedMatiere = [];
    }
    //console.log(allParsedMatiere);
    return allParsedMatiere;
}
var allParsedMatiere = getAllParsedMatiere();


function waitForUserInfo(empty)
{
    if(empty.lenght == 0)
    {
        setTimeout(() => {
        console.log(`en attente de l'input`);
        }, 3000);
        waitForUserInfo(empty)
    }
    return ;
}

// Fonction pour formater la date et l'heure au format iCalendar
function formatDate(date) {
    return date.toISOString().replace(/-/g, '').replace(/:/g, '').split('.')[0] + 'Z';
}

// Générer le contenu du fichier iCalendar
/*const event = {
    start: new Date('2023-12-06T08:00:00Z'),
    end: new Date('2023-12-06T10:00:00Z'),
    summary: 'Réunion importante',
    description: 'Discussion sur les projets à venir',
    location: 'Salle de conférence',
};*/


// Crée une interface de lecture
/*const date = readline.createInterface({
input: process.stdin,
output: process.stdout
});*/

function AskDates()
{
    let debut = '';
    let fin = '';
    date.question('Veuillez entrer la date de début pour votre calendrier (YYYY-MM-DD): ', (start) => {
        debut = start;

        date.question('Veuillez entrer la date de fin pour votre calendrier (YYYY-MM-DD): ', (end) => {
            fin = end;
            console.log(`Vous avez saisi : ${debut + fin }`);
            date.close();
        });    
    });
    return [debut, fin];
}




function AskMatiere()
{
    const mat = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var matieres = [];
    mat.question('Veuillez entrer vos matière separer d un tiret (SC00-SC01-SC02)', (input) => {
        matieres = input.split("-");
        mat.close();
    });
    
    
    if(matieres.length != 0)
    {
        return matieres;
    }else{waitForUserInfo(matieres);};
    
}


//var dates = AskDates();
/*var dates = ["24-05-2000","2023-12-06"]
//console.log(dates[1].getDay());
var deb = new Date(dates[1]);
console.log(deb.getDay());*/

/*const date = new Date('2023-12-06'); // Remplacez '2023-12-06' par votre date

const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const jourDeLaSemaine = joursSemaine[date.getDay()];

console.log(`Le ${date.toLocaleDateString()} est un ${jourDeLaSemaine}.`);


*/



/*
une fois que j'ai reussi a recup les matières dans 'le bon ordre'
get seance de chaques matieres 
get le jour de debut 
compare tout les premier car pour voir les jours des seances  
pour chaque seance qui coorespondent au jour donnée crée un evt 
passé au jour suivant, créé les evt ainsi de suite jusqu'a arrivé au jour de fin 

*/

var askMat = ["SC00","SC01","SC04"];
//fonctionne, allmat = toute les matiere dispo, ask mat = matiere du user, return tableau des seances correspondant aux ask mat
function getSeanceMatiere(allMat, askMat)
{
    var seances = [];
    let i = 0;
    
    for(const mat of askMat)
    {
        let j = 0;
        for(const amat of allMat)
        {
            
            if(askMat[i] == amat.nomMatiere)
            {
                var se = allMat[j].seances;
                let k =0;
                for(const s of se)
                {
                    seances.push(se[k]);
                    k++
                }
            }
            j++
        }
    i++;
    }

    return seances;
}

var a = getSeanceMatiere(allParsedMatiere,askMat)
//console.log(a);


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


function prepareDate(seances)
{
    for(const s of seance)
    {

    }
}
//var a = prepareDate(a);


//seances = liste de toutes les seance en fontions des matière
function createEvents(seances)
{
    var events = [];

    for(const seance of seances)
    {

        var deb = "";
        var fin = "";

        var ev = {
            start: new Date('2023-12-06T08:00:00Z'),
            end: new Date('2023-12-06T10:00:00Z'),
            summary: 'seance : ' + seance.type ,
            description: 'groupe : '+ seance.groupe,
            location: 'salle : ' + seance.salle,
        };
        events.push(ev);
    }
    
    return events;

}
var e = createEvents(a);
//console.log(typeof(e[0].start));
var d = new Date('2023-12-06T08:00:00Z');
console.log(d);
console.log(formatDate(d));

/*
    start: new Date('2023-12-06T08:00:00Z'),
    end: new Date('2023-12-06T10:00:00Z'),
*/


//events = list d'objet event 
function createIcsFile(events)
{
    var file = ``;
    file += `BEGIN:VCALENDAR
    VERSION:2.0`;


    
    for(const event of events)
    {   console.log(event);
        
        var ev = `BEGIN:VEVENT
        DTSTART:${formatDate(event.start)}
        DTEND:${formatDate(event.end)}
        SUMMARY:${event.summary}
        DESCRIPTION:${event.description}
        LOCATION:${event.location}
        END:VEVENT\n`
        file += ev;
        ev = ``;
    }
    file += "END:VCALENDAR";
    const filepath = './calendriers/mon_calendrier.ics';
    fs.writeFileSync(filepath, file);
    console.log(`Fichier ${filepath} créé avec succès.`);
}
