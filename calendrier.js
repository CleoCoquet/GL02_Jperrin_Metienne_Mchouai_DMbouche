/*générer un fichier iCalendar (RFC 5545) pour les
enseignements auxquels ils participent, entre deux dates
spécifiques*/
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');
const fs = require('fs');

// Fonction pour formater la date et l'heure au format iCalendar
function formatDate(date) {
    return date.toISOString().replace(/-/g, '').replace(/:/g, '').split('.')[0] + 'Z';
}

// Générer le contenu du fichier iCalendar
const event = {
    start: new Date('2023-12-06T08:00:00Z'),
    end: new Date('2023-12-06T10:00:00Z'),
    summary: 'Réunion importante',
    description: 'Discussion sur les projets à venir',
    location: 'Salle de conférence',
};

const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
    BEGIN:VEVENT
    DTSTART:${formatDate(event.start)}
    DTEND:${formatDate(event.end)}
    SUMMARY:${event.summary}
    DESCRIPTION:${event.description}
    LOCATION:${event.location}
    END:VEVENT
END:VCALENDAR`;

function AskDates()
{
    
}





































// Écriture du contenu dans un fichier .ics
const filepath = './calendriers/mon_calendrier.ics';
fs.writeFileSync(filepath, icsContent);
console.log(`Fichier ${filepath} créé avec succès.`);