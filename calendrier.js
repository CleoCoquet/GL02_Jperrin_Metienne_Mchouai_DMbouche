/*générer un fichier iCalendar (RFC 5545) pour les
enseignements auxquels ils participent, entre deux dates
spécifiques*/
const ical = require('ical-generator');
const fs = require('fs');
const readline = require('readline');
const CruParser = require('./CruParser');
const Matiere = require('./Matiere');
const Seance = require('./Seance');
