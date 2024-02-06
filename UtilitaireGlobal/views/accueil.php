<html>
    <head>
        <meta charset="utf-8"/>
        <title>Accueil</title>
        <?php
            if(isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>'; 
        ?>
    </head>

    <body>
        <div class="divAccueil">
            <div class="divAccueil gridChild"><a href="./?utilitaire=convert">Convertisseur</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=calculP">Plomberie</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=visco">Viscosité</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=tuyau">Diamètre des tuyauteries</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=calculV">Calcul du Kv des vannes</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=perteCR">Calcul des pertes de charges régulières</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=eauC">Calcul des installations d'eau chaude</a></div>
            <div class="divAccueil gridChild"><a href="./?utilitaire=lambda">Courbes de Lambda</a></div>
            <!--<div class="divAccueil" id="gridChild"><a href="./?utilitaire=perteCS">Calcul des pertes de charges singulières</a></div>-->
        </div>
    </body>
</html>