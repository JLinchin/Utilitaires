<html>
    <head>
        <title>Convertisseur</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body onload="setTypeDomaine()">
        <div id="choixDomaine">
            <p>Domaine :</p>
            <select name="domaine", id="domaine" onchange="setTypeDomaine()">
                <?php
                    foreach ($lesDomaines as $unDomaine)
                        echo '<option value="' . $unDomaine["id"] . '">' . $unDomaine["libelle"] . '</option>';
                ?>
            </select>
        </div>

        <div id="choixType">
            <p>Valeur : </p>
            <input type="number" id="valeurText", name="valeurText" value="1" oninput="convertion()"/>
            <select name="selectStart" id="selectStart" onchange="setTypeValeur()">
                <?php
                    foreach ($lesValeurs as $uneValeur)
                        echo '<option value="' . $uneValeur["id"] . '">' . $uneValeur["libelleSym"] . ' - ' . $uneValeur["libelleComplet"] . '</option>';
                ?>
            </select>
        </div>


        <div id="resultat">
            <table id="tableRes"></table>
        </div>

        <div class="gridResult">
        </div>

        <script src="scriptJs/scripts.js">
        </script>
    </body>
</html>