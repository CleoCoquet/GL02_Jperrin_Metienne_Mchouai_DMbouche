/*générer un fichier iCalendar (RFC 5545) pour les
enseignements auxquels ils participent, entre deux dates
spécifiques*/
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');
const fs = require('fs');


function runCalendrier() {
    function nombreJoursEntreDeuxDates(debut, fin) {
        // Convertir les dates en objets Date
        const dateDebut = new Date(debut);
        const dateFin = new Date(fin);

        // Calcul de la différence entre les deux dates en millisecondes
        const differenceEnMillisecondes = dateFin.getTime() - dateDebut.getTime();

        // Convertir la différence en jours
        const differenceEnJours = differenceEnMillisecondes / (1000 * 3600 * 24);

        return differenceEnJours;
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

        return allParsedMatiere;
    }

    var allParsedMatiere = getAllParsedMatiere();


    function waitForUserInfo(empty) {
        if (empty.lenght == 0) {
            setTimeout(() => {
                console.log(`en attente de l'input`);
            }, 3000);
            waitForUserInfo(empty)
        }
        return;
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

    function AskDates() {
        let debut = '';
        let fin = '';
        date.question('Veuillez entrer la date de début pour votre calendrier (YYYY-MM-DD): ', (start) => {
            debut = start;

            date.question('Veuillez entrer la date de fin pour votre calendrier (YYYY-MM-DD): ', (end) => {
                fin = end;
                console.log(`Vous avez saisi : ${debut + fin}`);
                date.close();
            });
        });
        return [debut, fin];
    }


    function AskMatiere() {
        const mat = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        var matieres = [];
        mat.question('Veuillez entrer vos matière separer d un tiret (SC00-SC01-SC02)', (input) => {
            matieres = input.split("-");
            mat.close();
        });


        if (matieres.length != 0) {
            return matieres;
        } else {
            waitForUserInfo(matieres);
        }
        ;

    }


//var dates = AskDates();


//fonctionne, allmat = toute les matiere dispo, ask mat = matiere du user, return tableau des seances correspondant aux ask mat
    function getSeanceMatiere(allMat, askMat) {
        var seances = [];
        let i = 0;

        for (const mat of askMat) {
            let j = 0;
            for (const amat of allMat) {

                if (askMat[i] == amat.nomMatiere) {
                    var se = allMat[j].seances;
                    let k = 0;
                    for (const s of se) {
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


//seances des differentes matiere de l'utilisateur, dates = date saisi par l'utilisateur return seance avec les date au bon format 
    function prepareDate(seances, dates) {
        var nbJoursDemander = nombreJoursEntreDeuxDates(dates[0], dates[1]);
        var deb = new Date(dates[0]);

        var jourSeance = ["D ", "L ", "MA", "ME", "J ", "V ", "S "];
        var mois = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        var jourNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

        var dateCourante = deb;
        for (let i = 0; i < nbJoursDemander; i++) {

            var jourDate = dateCourante.getDay();
            var moisDate = dateCourante.getMonth();


            for (const s of seances) {


                if (s.crenaux.substring(0, 2) == jourSeance[jourDate]) {
                    var heure = getHeureFromCrenaux(s.crenaux);
                    var debFin = heure.split("-");
                    var final = [`${dateCourante.getFullYear()}-${mois[moisDate]}-${jourNum[dateCourante.getDate() - 1]}T${debFin[0]}:00Z`, `${dateCourante.getFullYear()}-${mois[moisDate]}-${jourNum[dateCourante.getDate() - 1]}T${debFin[1]}:00Z`];
                    s.creneaux = final
                }
            }
            dateCourante.setDate(dateCourante.getDate() + 1);

        }
        return seances;

    }

//seances = liste de toutes les seance en fontions des matière
    function createEvents(seances) {
        var events = [];

        for (const seance of seances) {

            var deb = "";
            var fin = "";

            var ev = {
                start: new Date('2023-12-06T08:00:00Z'),
                end: new Date('2023-12-06T10:00:00Z'),
                summary: 'seance : ' + seance.type,
                description: 'groupe : ' + seance.groupe,
                location: 'salle : ' + seance.salle,
            };
            events.push(ev);
        }

        return events;

    }


//events = list d'objet event 
    function createIcsFile(events) {
        var file = ``;
        file += `BEGIN:VCALENDAR
    VERSION:2.0`;

        for (const event of events) {
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


    var askMat = ["SC00", "SC01", "SC04"];
    var askDates = ["2023-12-04", "2024-01-03"];
//il manque les fontion askmat et askdate a faire fonctionner elle sont remplace par des variable pour le moment 
    createIcsFile(createEvents(prepareDate(getSeanceMatiere(getAllParsedMatiere(), askMat), askDates)));
}

module.exports = runCalendrier;