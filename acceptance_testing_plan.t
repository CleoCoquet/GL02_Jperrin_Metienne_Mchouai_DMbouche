1-utilisation sous un OS autre que windows 
Résultat : echec
descrition : Utilisation impossible de part un problème de décryptage, sous ubuntu le lecteur de fichier fait la différence entre majuscule ou non, le fichier “sujetA” est donc différencier de “SujetA” il ne trouve pas le donc fichier associé.

2-Test de choix de matières non existantes
Résultat : succès
Descritption : le code nous renvoie un console.log qui nous indique que la matière n'existe pas 

3-utilisation sans salles
Résultat : echec
description : L'utilisation sans salles crée des problèmes dans tous les dossiers

4-Utilisation des options dispo... sans arguments : 
Résultat : succès
Description : un message est renvoyé disant qu'il faut rentrer des arguments

5-Tester en ajoutant de nouveaux fichier .cru
Résultat : succès 
Descrition : le code prend en compte les fichiers ajouter dans le fichier de data auquel il se réfère 

6-Tester sous différents environnements 
Résultat : partiel
Description : le code est moins réactive sur des environnements moins puissants de part la quantité de fichier à charger

7-Utilisation dans un ordre différent
Résultat : échec
Description : Si le logiciel est exécuté dans un ordre différent de celui spécifié dans le README, le code commence à générer des conflits dans le projet

8-utilisation de salle non existantes
Résultat : succès
Description : le code renvoie le message "salle non existante"

9-test de classementSalle avec des doublons 
Résultat : succès
Description : le code ne renvoie pas les doublons 



