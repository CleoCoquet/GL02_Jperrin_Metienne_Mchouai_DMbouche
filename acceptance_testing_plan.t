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

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Test réalisé avec un processeur windows 11 ryzen 5000

1-utilisation sous un OS autre que windows
Résultat : Succès
description : Le code fonctionne sans problème sous windows 11

2-Test de sélection de sujets inexistants
Résultat : succès
Description : le code renvoie un console.log indiquant que le sujet n'existe pas.

3-utilisation sans pièces
Résultat : partiel
description : L'utilisation sans les salles renvoie juste des logs vides

4-Utilisation des options disponibles... sans arguments :
Résultat : succès
description : un message est retourné vous demandant d'entrer des arguments

5-Test en ajoutant de nouveaux fichiers .cru
Résultat : succès : Succès
Description : L'analyseur de cru vérifie les nouveaux fichiers et les ajoute au fichier de données : L'analyseur Cru vérifie les nouveaux fichiers et les ajoute au fichier de données.

6-Test sous différents environnements
Résultat : succès
Description : Le code peut être exécuté sans problème dans différents environnements : Le code peut être exécuté sous différents environnements sans aucun problème.

7-Utiliser dans un ordre différent
Résultat : le code peut être utilisé dans différents environnements sans problème : Partiel
Description : Plusieurs commandes ont été testées sans problème : Plusieurs ordres ont été testés sans problème, mais le code n'a pas été testé dans tous les ordres possibles.

8-Utilisation de pièces inexistantes
Résultat : succès
Description : le code renvoie le message "salle inexistante".

9-Tester la classification des chambres avec des doublons
Résultat : le code renvoie le message "salle inexistante" : Succès
Description : le code ne renvoie pas de doublons