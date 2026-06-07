import { CodeSnippet } from './types';

export const snippets: CodeSnippet[] = [
  {
    id: 'script-head',
    title: "1. Script dans la balise <head>",
    page: "Page 3",
    section: "Insertion d'un Script JavaScript dans une page HTML",
    description: "Exécution différée d'un script JavaScript. Le code est chargé en mémoire dans <head>, puis exécuté lorsqu'un événement utilisateur (comme un clic sur un bouton) est déclenché.",
    filename: "DOMGUIA_TAKAM/01_script_head.html",
    expectedOutput: "Affiche une boîte de dialogue alerte contenant : 'Afficher ce message lorsque vous cliquez sur le bouton Afficher' lorsque vous cliquez sur le bouton.",
    vsCodeInstructions: `1. Créez un dossier appelé 'DOMGUIA TAKAM' sur votre ordinateur.\n2. Ouvrez VS Code dans ce dossier.\n3. Créez un fichier '01_script_head.html'.\n4. Collez-y le code ci-dessous.\n5. Faites un clic droit et sélectionnez 'Open with Live Server' (ou ouvrez-le directement dans votre navigateur).`,
    executionType: 'alert',
    originalCode: `<html> 
<head> 
<title>Page JavaScript </title> 
<script type="text/javascript"> 
// ecrire le code JavaScript Ici 
function Message() 
 { 
 alert("Afficher ce message lorsque vous cliquez sur le bouton Afficher") 
 } 
</script> 
</head> 
<body> 
Exemple de code JavaScript <br /><br /> 
<input type = "button" value ="Afficher" Name = "Bouton1" onClick="Message()" /> 
</body> 
</html>`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Insertion de script dans <head> (Page 3)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Page JavaScript - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function Message() { 
            alert("Afficher ce message lorsque vous cliquez sur le bouton Afficher - DOMGUIA TAKAM"); 
        } 
    </script> 
</head> 
<body> 
    <h3>Exemple de code JavaScript (Dans head)</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    <input type="button" value="Afficher" name="Bouton1" onclick="Message()" /> 
</body> 
</html>`
  },
  {
    id: 'script-body',
    title: "2. Script dans la balise <body>",
    page: "Page 4",
    section: "Insertion d'un Script JavaScript dans une page HTML",
    description: "Exécution directe ou automatique d'un script lors du chargement de la page HTML par le navigateur, sans qu'un événement utilisateur soit indispensable.",
    filename: "DOMGUIA_TAKAM/02_script_body.html",
    expectedOutput: "Dès l'ouverture ou le rechargement de la page, une boîte d'alerte s'affiche automatiquement à l'écran avec le message : 'Afficher ce message :Bonjour à Tous'. Une fois l'alerte fermée, le texte de la page s'affiche.",
    vsCodeInstructions: `1. Dans votre dossier 'DOMGUIA TAKAM' de VS Code, créez un fichier '02_script_body.html'.\n2. Collez le code corrigé ci-dessous.\n3. Lancez-le avec l'extension Live Server ou double-cliquez pour l'ouvrir dans Google Chrome ou votre navigateur favori.\n4. Observez l'alerte automatique qui précède l'affichage du contenu.`,
    executionType: 'alert',
    originalCode: `<html> 
<head> 
<title>Page javascript </title> 
</head> 
<body> 
Exemple de code JavaScript <br /><br /> 
<script type="text/javascript"> 
alert("Afficher ce message :Bonjour à Tous ") 
</Script> 
</body> 
</html>`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Insertion de script dans <body> (Page 4)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Page javascript - Direct - DOMGUIA TAKAM</title> 
</head> 
<body> 
    <h3>Exemple de code JavaScript (Dans body)</h3> 
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        alert("Afficher ce message : Bonjour à Tous (DOMGUIA TAKAM JOEL ISMAEL_23V2313)"); 
    </script> 
</body> 
</html>`
  },
  {
    id: 'script-externe',
    title: "3. Script trouvé à l'extérieur (Externe .js)",
    page: "Page 5",
    section: "Insertion d'un Script JavaScript dans une page HTML",
    description: "Séparation complète de la logique (JS) et de la structure (HTML). Le code JavaScript réside dans un fichier '.js' séparé et est importé par la balise <script src='...'>.",
    filename: "DOMGUIA_TAKAM/03_script_externe.html",
    expectedOutput: "Importe le fichier 'Visualiser.js' et lance une alerte automatique disant : 'si vous voyez ce message c'est que votre code a été exécuté'.",
    vsCodeInstructions: `1. Créez un fichier 'Visualiser.js' dans votre dossier 'DOMGUIA TAKAM' et collez le premier bloc de code.\n2. Créez un fichier '03_script_externe.html' dans le même dossier et collez-y le second bloc de code (HTML).\n3. Lancez '03_script_externe.html' avec Live Server.`,
    executionType: 'alert',
    originalCode: `// Contenu du fichier Visualiser.js ou Visualiser.txt :
alert("si vous voyez ce message c'est que votre code a été exécuté")

// Contenu du fichier script2.html :
<html> 
<head> 
<title>Page JavaScript </title> 
<body> 
Exemple de code JavaScript <br /><br />
<script src ="Visualiser.js"></script > 
</body> 
</html>`,
    correctedCode: `/* Fichier : Visualiser.js */
// AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
alert("si vous voyez ce message c'est que votre code de DOMGUIA TAKAM a été exécuté");


<!-- Fichier : 03_script_externe.html -->
<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Page JavaScript Externe - DOMGUIA TAKAM</title> 
</head>
<body> 
    <h3>Exemple de code JavaScript Externe</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    <!-- Importation du script externe -->
    <script src="Visualiser.js"></script> 
</body> 
</html>`
  },
  {
    id: 'script-lien',
    title: "4. Insertion à l'aide d'un lien <a href>",
    page: "Page 5",
    section: "Insertion d'un Script JavaScript dans une page HTML",
    description: "Utilisation du protocole virtuel 'javascript:' dans l'attribut href d'une balise d'ancrage <a> pour déclencher l'évaluation d'un code ou d'une fonction au clic.",
    filename: "DOMGUIA_TAKAM/04_script_lien.html",
    expectedOutput: "Affiche une alerte d'information lors du clic sur le lien hypertexte.",
    vsCodeInstructions: `1. Créez un fichier '04_script_lien.html' dans votre dossier 'DOMGUIA TAKAM' de VS Code.\n2. Ajoutez-y la fonction 'Afficher_Note()' dans la balise head, puis le lien d'appel dans le body.\n3. Exécutez le dans VS Code avec Live Server et cliquez sur le lien hypertexte pour exécuter l'action.`,
    executionType: 'alert',
    originalCode: `<a href="javascript:NomFonction()" >cliquer ici pour le résultat </a>
Exemple :
<a href ="javascript:Afficher_Note()"> cliquer pour résultat </a>`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Insertion de script dans un lien (Page 5)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Appel par Lien Hypertexte - DOMGUIA TAKAM</title> 
    <script type="text/javascript">
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function Afficher_Note() {
            alert("Note d'information : Cette fonction est appelée directement par le lien href de DOMGUIA TAKAM (23V2313) !");
        }
    </script>
</head> 
<body> 
    <h3>Exemple d'Insertion via Lien Hypertexte</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    <a href="javascript:Afficher_Note()">Cliquer ici pour voir le résultat</a> 
</body> 
</html>`
  },
  {
    id: 'variables-operateurs',
    title: "5. Les Variables et Opérateurs",
    page: "Page 7",
    section: "Éléments du langage JavaScript",
    description: "Déclaration de variables globales à l'aide du mot-clé 'var'. Ce snippet illustre l'usage des opérateurs d'incrémentation (--) et d'addition (+) pour manipuler des notes numériques.",
    filename: "DOMGUIA_TAKAM/05_variables.html",
    expectedOutput: "Affiche d'abord la valeur courante (Emile Zola) via clic, et affiche séquentiellement l'évaluation d'opérateurs pour des notes (85 + 5 - 1 = 89) directement.",
    vsCodeInstructions: `1. Créez '05_variables.html' sous votre dossier 'DOMGUIA TAKAM' dans VS Code.\n2. Ce code réalise de l'écriture directe d'une variable via document.write().\n3. Ouvrez le fichier avec Live Server.\n4. Cliquez sur le bouton 'information' pour afficher la variable Nom 'Emile Zola'.\n5. La sous-section de manipulation de notes affichera 89 lors de son appel.`,
    executionType: 'document',
    originalCode: `// Exemple 1:
var Nom ="Emile Zola"; 
function Afficher(); 
{ 
document.write(Nom); 
} 

// Exemple 2:
var Note =85; 
var Bonus =5 
function Afficher_Note() 
{ 
Note = Note + Bonus; 
Note --; 
document.write(Note); 
} 
Ce qui affiche 89`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Déclaration de variables et opérateurs (Page 7)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Variables et Opérateurs - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        var Nom = "Emile Zola"; 
        var Note = 85; 
        var Bonus = 5; 

        function Afficher() { 
            // document.write réécrit la page. Pour éviter cela, on peut injecter
            // dans un élément html, mais la consigne demande d'illustrer la syntaxe exacte.
            document.open();
            document.write("<h4>Nom d'auteur :</h4> " + Nom + "<br/><br/><p>Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313</p>");
            document.close();
        } 

        function Afficher_Note() { 
            // Opérateur d'addition
            Note = Note + Bonus; // 85 + 5 = 90
            // Opérateur de décrémentation 
            Note--; // 90 - 1 = 89
            
            document.open();
            document.write("<h4>Résultat du calcul de Note :</h4>" + Note + " / 100 <br/><br/><p>Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313</p>");
            document.close();
        } 
    </script> 
</head> 
<body> 
    <h3>Déclaration de Variables - DOMGUIA TAKAM</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    <input type="button" value="Afficher le Nom (Emile Zola)" name="Bouton2" onclick="Afficher()" /> 
    <br /><br />
    <input type="button" value="Calculer et Afficher la Note (85 + 5 - 1)" name="Bouton3" onclick="Afficher_Note()" /> 
</body> 
</html>`
  },
  {
    id: 'alternative-if',
    title: "6. L'Alternative (if, if...else)",
    page: "Page 9",
    section: "Les instructions de contrôles",
    description: "Permet de conditionner l'exécution d'un bloc de code. On récupère dynamiquement l'heure locale sur la machine du client, et on affiche 'Good morning' si l'heure est sous la barre des 10 h, sinon 'Good day'.",
    filename: "DOMGUIA_TAKAM/06_alternative.html",
    expectedOutput: "Affiche textuellement en gras 'Good morning' ou 'Good day' selon l'heure courante au chargement.",
    vsCodeInstructions: `1. Créez un fichier '06_alternative.html' dans 'DOMGUIA TAKAM'.\n2. Collez-y le code ci-dessous.\n3. En ouvrant dans VS Code avec Live Server, le script examinera l'heure actuelle de votre ordinateur.\n4. Si l'heure est inférieure à 10, le message 'Good morning' apparaîtra en gras. Sinon, 'Good day' apparaîtra.`,
    executionType: 'document',
    originalCode: `var d = new Date(); 
var time = d.getHours(); 
if (time < 10) 
{ 
document.write("<b>Good morning</b>"); 
} 
else 
{ 
document.write("<b>Good day</b>"); 
}`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Instructions alternatives (Page 9)
-->
<html lang="fr"> 
<head>
    <meta charset="UTF-8">
    <title>Instructions alternatives - DOMGUIA TAKAM</title>
</head>
<body> 
    <h3>Contrôles : L'Alternative if ... else</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <p>Message généré dynamiquement selon l'heure du client :</p>
    
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        var d = new Date(); 
        var time = d.getHours(); 
        
        document.write("L'heure actuelle est : <b>" + time + "h</b><br />");
        
        if (time < 10) { 
            document.write("Résultat de l'alternative : <b>Good morning</b>"); 
        } else { 
            document.write("Résultat de l'alternative : <b>Good day</b>"); 
        } 
    </script> 
</body> 
</html>`
  },
  {
    id: 'alternative-switch',
    title: "7. Le Switch (Cas multiples)",
    page: "Page 10",
    section: "Les instructions de contrôles",
    description: "Évalue une expression de manière sélective parmi plusieurs cas définis (variables de 0 pour Dimanche à 6 pour Samedi), puis arrête l'évaluation grâce à l'instruction 'break'.",
    filename: "DOMGUIA_TAKAM/07_switch.html",
    expectedOutput: "Affiche le message d'accueil correspondant au jour actuel de la semaine (ex: 'Super Saturday' le samedi, 'Finally Friday' le vendredi, 'Sleepy Sunday' le dimanche, ou un message par défaut les autres jours).",
    vsCodeInstructions: `1. Créez un fichier '07_switch.html' dans 'DOMGUIA TAKAM'.\n2. Collez-y le code et enregistrez.\n3. Ouvrez le fichier dans le navigateur via Live Server.\n4. Le script détecte le jour de la semaine et écrit le message d'accueil approprié en direct sur le document.`,
    executionType: 'document',
    originalCode: `var d=new Date(); 
theDay=d.getDay(); 
switch (theDay) 
{ 
case 5: 
 document.write("Finally Friday"); 
 break; 
case 6: 
 document.write("Super Saturday"); 
 break; 
case 0: 
 document.write("Sleepy Sunday"); 
 break; 
default: 
 document.write("I'm looking forward to this weekend!"); 
}`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Structure conditionnelle Switch (Page 10)
-->
<html lang="fr"> 
<head>
    <meta charset="UTF-8">
    <title>Structure de contrôle Switch - DOMGUIA TAKAM</title>
</head>
<body> 
    <h3>Contrôles : L'instruction Switch</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <p>Salutations générées selon le jour actuel de la semaine :</p>
    
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        var d = new Date(); 
        var theDay = d.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
        var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        
        document.write("Nous sommes aujourd'hui : <b>" + jours[theDay] + "</b> (Indice " + theDay + ")<br/>");
        
        document.write("Message : <b>");
        switch (theDay) { 
            case 5: 
                document.write("Finally Friday"); 
                break; 
            case 6: 
                document.write("Super Saturday"); 
                break; 
            case 0: 
                document.write("Sleepy Sunday"); 
                break; 
            default: 
                document.write("I'm looking forward to this weekend!"); 
        } 
        document.write("</b>");
    </script> 
</body> 
</html>`
  },
  {
    id: 'boucles-itera',
    title: "8. Les boucles (for, while, do...while)",
    page: "Page 11-12",
    section: "Les instructions de contrôles - Les itératives",
    description: "Comparaison des trois structures d'itération majeures en JavaScript (for, while, do...while) qui répètent un bloc d'instructions de 1 à 5 tout en incrémentant une variable d'indice.",
    filename: "DOMGUIA_TAKAM/08_boucles.html",
    expectedOutput: "Affiche 3 listes numérotées de 'The number is 0' jusqu'à 'The number is 5', chacune séparée par des retours à la ligne.",
    vsCodeInstructions: `1. Créez un fichier '08_boucles.html' dans 'DOMGUIA TAKAM'.\n2. Insérez-y le code révisé ci-dessous combinant les exemples For, While et Do While pour une meilleure comparaison.\n3. Enregistrez et ouvrez via Live Server pour visualiser les résultats des exécutions répétitives.`,
    executionType: 'document',
    originalCode: `// Boucle For:
for (i = 0; i <= 5; i++) 
{ 
document.write("The number is " + i); 
document.write("<br />"); 
} 

// Boucle While:
var i=0; 
while (i<=5) 
{ 
document.write("The number is " + i); 
document.write("<br />"); 
i++; 
} 

// Boucle Do While:
var i = 0; 
do 
{ 
document.write("The number is " + i); 
document.write("<br />"); 
i++; 
} 
while (i <= 5)`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Les Itératives (Page 11-12)
-->
<html lang="fr"> 
<head>
    <meta charset="UTF-8">
    <title>Les Structures Itératives - DOMGUIA TAKAM</title>
</head>
<body> 
    <h3>Contrôles : Les Boucles</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    
    <div style="display: flex; gap: 40px; margin-top: 20px;">
        <div style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
            <h4>1. Boucle FOR</h4>
            <script type="text/javascript">
                // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
                for (var i = 0; i <= 5; i++) { 
                    document.write("The number is " + i + "<br />"); 
                } 
            </script>
        </div>

        <div style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
            <h4>2. Boucle WHILE</h4>
            <script type="text/javascript">
                // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
                var j = 0; 
                while (j <= 5) { 
                    document.write("The number is " + j + "<br />"); 
                    j++; 
                } 
            </script>
        </div>

        <div style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
            <h4>3. Boucle DO WHILE</h4>
            <script type="text/javascript">
                // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
                var k = 0; 
                do { 
                    document.write("The number is " + k + "<br />"); 
                    k++; 
                } while (k <= 5);
            </script>
        </div>
    </div>
</body> 
</html>`
  },
  {
    id: 'fonctions-somme',
    title: "9. Déclaration & appel des Fonctions",
    page: "Page 13, 15",
    section: "Les fonctions / Quelques objets",
    description: "Crée une fonction nommée 'somme_N_entiers' prenant en paramètre un nombre donné, calcule sa somme cumulée (1 + 2 + 3 + ... + nb) et effectue une écriture en direct des étapes d'évaluation.",
    filename: "DOMGUIA_TAKAM/09_fonctions.html",
    expectedOutput: "Affiche l'historique d'évaluation cumulée jusqu'à la valeur choisie puis retourne le total (Pour nb = 5, le total retourné est 15).",
    vsCodeInstructions: `1. Créez un fichier '09_fonctions.html' dans votre dossier 'DOMGUIA TAKAM'.\n2. Notez que dans l'original, document.write effaçait les inputs de formulaire. Dans cette version corrigée, nous affichons le résultat proprement dans une div dédiée pour maintenir les contrôles interactifs !\n3. Ouvrez avec Live Server, tapez un nombre de votre choix et cliquez sur 'Calculer'.`,
    executionType: 'interactive',
    originalCode: `// Déclaration de fonction:
function somme_N_entiers (nb) 
{ 
 var somme=0; 
 for (i=1; i <=nb ; i++) 
{ 
 somme=somme + i ; 
 document.write("Pour i = " + i + " , somme = " + somme + "<br />"); 
} 
 return somme; 
} 

// Formulaire :
Entrer un nombre <br /> 
<input type="text" name="nbre"/> 
<input type = "button" value ="calculer" name = "Bouton2" 
onClick="somme_N_entiers (nbre.value)" />`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Déclaration et appel de fonction (Page 13, 15)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Exemple de Fonctions - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function somme_N_entiers(nb) { 
            var inputNumber = parseInt(nb, 10);
            var outputDiv = document.getElementById("affichage_resultat");
            
            if (isNaN(inputNumber) || inputNumber < 1) {
                alert("Veuillez saisir un nombre entier supérieur à 0");
                return;
            }

            var somme = 0; 
            var textResultat = "<h4>Résultats intermédiaires calculés :</h4>";
            
            for (var i = 1; i <= inputNumber; i++) { 
                somme = somme + i; 
                textResultat += "Pour i = " + i + " , somme cumulée = <b>" + somme + "</b><br />"; 
            } 
            
            textResultat += "<br/><b>Total final calculé : " + somme + "</b><br/>";
            textResultat += "<p style='color: gray; font-size: 11px;'>Calculé par : DOMGUIA TAKAM JOEL ISMAEL_23V2313</p>";
            
            // On injecte au lieu de document.write pour ne pas écraser les boutons !
            outputDiv.innerHTML = textResultat;
            return somme; 
        } 
    </script> 
</head> 
<body> 
    <h3>Les Fonctions : Somme des N premiers entiers</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    
    <!-- Appel de la fonction réécrit de manière sécurisée --> 
    <label for="nbre">Entrer un nombre entier : </label>
    <input type="number" id="nbre" name="nbre" min="1" placeholder="Ex: 5" style="padding: 4px; width: 80px;" /> 
    <input type="button" value="Calculer" name="Bouton2" onclick="somme_N_entiers(document.getElementById('nbre').value)" /> 
    
    <br /><br />
    <div id="affichage_resultat" style="padding: 10px; border: 1px dotted #888; border-radius: 4px; background: #fafafa; font-family: monospace;">
        Le résultat apparaîtra ici... (Auteur : DOMGUIA TAKAM JOEL ISMAEL)
    </div>
</body> 
</html>`
  },
  {
    id: 'document-dom',
    title: "10. L'objet Document (DOM)",
    page: "Page 17-18",
    section: "Quelques objets du langage javascript",
    description: "Permet de compter et cibler des éléments HTML structurés. Illustre l'accès via `document.getElementsByTagName` pour compter le nombre d'images d'une page, ainsi que `document.getElementById('id').innerHTML` pour changer ou récupérer le code HTML d'un conteneur.",
    filename: "DOMGUIA_TAKAM/10_document_dom.html",
    expectedOutput: "Affiche une alerte indiquant le nombre d'images présentes dans le document (ici, 3), ou extrait la valeur textuelle d'un titre suite à un clic sur cette balise.",
    vsCodeInstructions: `1. Créez un fichier '10_document_dom.html' au sein de votre dossier 'DOMGUIA TAKAM'.\n2. Copiez-collez le code ci-dessous.\n3. Pour l'exemple d'images, nous utilisons des placeholders d'images.\n4. Lancez via Live Server.\n5. Cliquez sur le titre pour tester 'innerHTML' ou sur le bouton pour tester 'getElementsByTagName'.`,
    executionType: 'interactive',
    originalCode: `// Exemple 1: getElementsByTagName
function Nbre_images() 
 { 
 var x=document.getElementsByTagName("img"); 
 alert(x.length); 
 } 
// Exemple 2: getElementById et innerHTML
function obtenirValeur() 
 { 
 var x=document.getElementById("titre") 
 alert(x.innerHTML) 
 }`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Manipulation d'objet Document (Page 17-18)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Objet Document - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function Nbre_images() { 
            var x = document.getElementsByTagName("img"); 
            alert("Il y a : " + x.length + " image(s) détectée(s) dans ce document par le script de DOMGUIA TAKAM !"); 
        } 

        function obtenirValeur() { 
            var x = document.getElementById("titre"); 
            alert("La valeur textuelle lue via x.innerHTML est :\\n\\"" + x.innerHTML + "\\"\\n\\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)"); 
        } 
    </script> 
</head> 
<body> 
    <h3 id="titre" onclick="obtenirValeur()" style="cursor: pointer; color: #0284c7; text-decoration: underline;">
        Titre Interactif (Cliquez-moi pour récupérer l'élément)
    </h3> 
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <p>Consigne : Cliquez sur le titre souligné ci-dessus ou sur le bouton ci-dessous pour lancer l'analyse DOM.</p>
    <hr />
    <br />

    <!-- 3 Images factices pour les tests DOM -->
    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
        <img src="https://picsum.photos/id/10/120/80" alt="Flash" style="border: 2px solid #555;" /> 
        <img src="https://picsum.photos/id/20/120/80" alt="Photoshop" style="border: 2px solid #555;" /> 
        <img src="https://picsum.photos/id/30/120/80" alt="Dreamweaver" style="border: 2px solid #555;" /> 
    </div>

    <input type="button" onclick="Nbre_images()" value="Combien d'images y'a-t-il dans ce document ?" /> 
</body> 
</html>`
  },
  {
    id: 'formulaires-radio',
    title: "11. Traitement des Formulaires (Boutons Radio)",
    page: "Page 20",
    section: "Quelques objets du langage javascript - Formulaires",
    description: "S'inscrire à l'écoute d'un événement au format formulaire. Permet de vérifier quel type d'option a été coché par l'utilisateur (Mathématiques ou Informatique) et d'en extraire la valeur textuelle associée.",
    filename: "DOMGUIA_TAKAM/11_formulaires_radio.html",
    expectedOutput: "Affiche une boîte d'alerte indiquant précisément quelle matière a été choisie par l'utilisateur lorsqu'il clique sur 'Essayer'.",
    vsCodeInstructions: `1. Créez un fichier '11_formulaires_radio.html' dans 'DOMGUIA TAKAM'.\n2. Copiez-collez le code corrigé ci-dessous.\n3. Utilisez et testez les boutons radio interactifs par clic de validation.`,
    executionType: 'form',
    originalCode: `function Tester(Forme1) 
{ 
if (Forme1.test[0].checked) 
{alert("Vous avez choisi:" + " " + Forme1.test[0].value)}; 
if (Forme1.test[1].checked) 
{alert("Vous avez choisi" + " " + Forme1.test[1].value)}; 
} 

<form name = "Forme"> 
<input type = "radio" name ="test" value ="Mathématiques" /> Mathématiques <br /> 
<input type = "radio" name ="test" value = "Informatique" /> Informatique <br /> 
<input type = "button" value ="Essayer" Name = "Bouton1" onClick="Tester(Forme)" /> 
</form>`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Formulaires et boutons radio (Page 20)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Boutons Radio - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function Tester(Forme1) { 
            // On cible par index ou directement par elements
            var testOptions = Forme1.elements["test"];
            if (testOptions[0].checked) {
                alert("Vous avez choisi : " + testOptions[0].value + "\\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
            } else if (testOptions[1].checked) {
                alert("Vous avez choisi : " + testOptions[1].value + "\\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
            } else {
                alert("Veuillez choisir une matière d'abord !");
            }
        } 
    </script> 
</head> 
<body> 
    <h3>Saisie Formulaire : Boutons Radio</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    
    <form name="Forme"> 
        <input type="radio" name="test" value="Mathématiques" id="math" /> 
        <label for="math">Mathématiques</label> <br /> 
        
        <input type="radio" name="test" value="Informatique" id="info" /> 
        <label for="info">Informatique</label> <br /><br /> 
        
        <input type="button" value="Essayer" name="Bouton1" onclick="Tester(this.form)" /> 
    </form> 
</body> 
</html>`
  },
  {
    id: 'formulaires-checkbox',
    title: "12. Traitement des Formulaires (Cases à cocher)",
    page: "Page 21",
    section: "Quelques objets du langage javascript - Formulaires",
    description: "Permet l'évaluation de choix multiples cumulés. Ce code évalue si les deux bonnes réponses requises ('Algorithmie' et 'Mathématiques' - Case1 et Case2) ont été correctement cochées par l'étudiant.",
    filename: "DOMGUIA_TAKAM/12_cases_cocher.html",
    expectedOutput: "Affiche l'alerte 'Vous avez choisi la bonne réponse' si et seulement si Case1 et Case2 sont vraies (cochées), ou l'alerte 'Vous n'avez pas la bonne réponse' dans le cas contraire.",
    vsCodeInstructions: `1. Créez un fichier '12_cases_cocher.html' dans votre dossier 'DOMGUIA TAKAM'.\n2. Utilisez le code révisé ci-dessous.\n3. Ouvrez avec Live Server et tentez de cocher uniquement les matières scientifiques informatiques (Algorithmie & Mathématiques) pour obtenir la validation du questionnaire.`,
    executionType: 'form',
    originalCode: `function Choix_Reponse(Forme2) 
{ 
if ((Forme2.Case1.checked) == true && (Forme2.Case2.checked) ==true) 
{ 
alert("Vous avez choisi la bonne réponse" ) 
} 
else 
{ 
alert("Vous n'avez pas la bonne réponse"); 
} 
} 

<form name = "Forme"> 
Citer deux cours obligatoires en informatique 
<br /> 
<input type = "checkbox" name ="Case1" value ="Algorithmie"> Algorithmie <br /> 
<input type = "checkbox" name ="Case2" value = "Mathématiques"> Mathématiques 
<br /> 
<input type = "checkbox" name ="Case3" value ="Espgnol"> Espagnol<br /> 
<input type = "button" value ="Essayer" Name = "Bouton2" 
onClick="Choix_Reponse(Forme2)" > 
</form>`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Cases à Cocher / Checkbox (Page 21)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Cases à cocher - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function Choix_Reponse(Forme2) { 
            var checked1 = Forme2.elements["Case1"].checked;
            var checked2 = Forme2.elements["Case2"].checked;
            var checked3 = Forme2.elements["Case3"].checked;

            // La bonne réponse consiste à cocher exactement Case1 (Algorithmie) et Case2 (Mathématiques),
            // sans cocher la Case3 (Espagnol).
            if (checked1 === true && checked2 === true && checked3 === false) { 
                alert("Félicitations ! Vous avez choisi la bonne réponse de informatique.\\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)"); 
            } else { 
                alert("Vous n'avez pas la bonne réponse... Rappel: Espagnol n'est pas un cours obligatoire d'informatique !"); 
            } 
        } 
    </script> 
</head> 
<body> 
    <h3>Saisie Formulaire : Cases à Cocher (Choix Multiples)</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <hr />
    <br />
    
    <form name="Forme"> 
        <strong>Citer deux cours obligatoires en informatique :</strong><br /><br />
        
        <input type="checkbox" name="Case1" id="case1" value="Algorithmie" /> 
        <label for="case1">Algorithmie</label> <br /> 
        
        <input type="checkbox" name="Case2" id="case2" value="Mathématiques" /> 
        <label for="case2">Mathématiques</label><br /> 
        
        <input type="checkbox" name="Case3" id="case3" value="Espagnol" /> 
        <label for="case3">Espagnol</label><br /><br /> 
        
        <input type="button" value="Essayer" name="Bouton2" onclick="Choix_Reponse(this.form)" /> 
    </form> 
</body> 
</html>`
  },
  {
    id: 'evenement-events',
    title: "13. Les événements (onFocus & onBlur)",
    page: "Page 22-23",
    section: "Quelques événements du langage JavaScript",
    description: "Événements déclenchés par le focus d'un élément d'entrée. `onFocus` se produit lorsqu'un élément HTML reçoit le focus (ex: clic ou tabulation pour taper du texte), colorant l'arrière-plan en jaune. `onBlur` se déclenche quand le focus est perdu.",
    filename: "DOMGUIA_TAKAM/13_evenements_focus.html",
    expectedOutput: "Sélectionner un champ texte colorie instantanément son arrière-plan en jaune.",
    vsCodeInstructions: `1. Créez un fichier '13_evenements_focus.html' sous 'DOMGUIA TAKAM'.\n2. Collez-y le code optimisé ci-dessous.\n3. Ouvrez-le sous VS Code avec Live Server.\n4. Cliquez successivement sur le premier champ 'First name' puis sur le second 'Last name'.\n5. Observez que chaque champ actif devient jaune, et redevient blanc en cas de perte de focus (onBlur).`,
    executionType: 'events',
    originalCode: `function setStyle(x) 
{ 
y=document.getElementById(x); 
y.style.background="yellow"; 
} 

First name: <input type="text" onfocus="setStyle(id)" id="fname" /> 
<br /> 
Last name: <input type="text" onfocus="setStyle(id)" id="lname" />`,
    correctedCode: `<!DOCTYPE html>
<!-- 
  PROJET : Guide Pratique JavaScript
  DOSSIER : DOMGUIA TAKAM
  AUTEUR : DOMGUIA TAKAM JOEL ISMAEL_23V2313
  SECTION : Événements onFocus et onBlur (Page 22-23)
-->
<html lang="fr"> 
<head> 
    <meta charset="UTF-8">
    <title>Événements onFocus & onBlur - DOMGUIA TAKAM</title> 
    <script type="text/javascript"> 
        // Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313
        function setStyle(id) { 
            var y = document.getElementById(id); 
            y.style.background = "yellow"; 
        } 

        function clearStyle(id) {
            var y = document.getElementById(id);
            y.style.background = "white"; // redevient blanc à la perte du focus (onBlur)
        }
    </script> 
</head> 
<body> 
    <h3>Événements formulaire : Focus et Perte de Focus</h3>
    <p>Auteur : DOMGUIA TAKAM JOEL ISMAEL (ID: 23V2313)</p>
    <p>Instruction : Utilisez la tabulation ou cliquez dans les cadres pour voir l'effet de couleur.</p>
    <hr />
    <br />
    
    <form name="FormulaireFocus">
        <label for="fname">Prénom (First name) :</label><br />
        <input type="text" id="fname" onfocus="setStyle('fname')" onblur="clearStyle('fname')" style="padding: 5px; border: 1px solid #777; border-radius: 4px;" /> 
        <br /><br /> 
        
        <label for="lname">Nom de famille (Last name) :</label><br />
        <input type="text" id="lname" onfocus="setStyle('lname')" onblur="clearStyle('lname')" style="padding: 5px; border: 1px solid #777; border-radius: 4px;" /> 
    </form>
</body> 
</html>`
  }
];
