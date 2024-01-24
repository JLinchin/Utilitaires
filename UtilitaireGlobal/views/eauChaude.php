<html>
    <head>
        <meta charset="utf-8"/>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
        <title>Installation d'eau chaude</title>
    </head>

    <body onload="calculEauChaude()">
        <div id="saisies">
            <label for="selMat">Matériaux : </label>
            <select name="selMat" id="selMat" onchange="changeRugo()">
                <option value="-1">Saisie directe</option>
                <option value="0.05">Acier : 0.05</option>
                <option value="0.005">Cuivre : 0.005</option>
                <option value="0.007">Plastique : 0.007</option>
            </select>

            <label for="valRug">Rugosité : </label>
            <input type="number" name="valRug" id="valRug" value="0.05" oninput="calculEauChaude()"/>
        </div>

        <div id="resultats">
            <p>Pertes de charge en Pa par m</p>
            <div id="gridParent">
            </div>
        </div>


        <script src="scriptJs/scripts.js"></script>
    </body>
</html>