<html>
    <head>
        <title>Convertisseur</title>
        <meta charset="utf-8"/>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
    </head>
    <body onload="setTypeDomaine()">
        <span>
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
        </span>
        
        <script src="scriptJs/scriptsConvert.js"></script>
    </body>
</html>