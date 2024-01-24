<html>
    <head>
        <title>Calcul viscosité de l'air / masse volumique</title>
        <meta charset="utf-8"/>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
    </head>

    <body onload="calculsViscos()">
        <div>
            <label for="valAlti">Altitude de clacul (en m) :</label>
            <input type="number" name="valAlti" id="valAlti" value="200" oninput="calculsViscos()"/>
        </div>

        <div id="calcRes">
            <div id="calculs">
                <p>Calcul manuel</p>
                <div id="saisis">
                   <label for="valTemp">Température (en °C) :</label>
                   <input type="number" name="valTemp" id="valTemp" value="20" oninput="calculManuel()"/> 
                </div>

                <div id="nonsaisis">
                    <label for="constMV">Masse volumique :</label>
                    <input type="number" name="constMV" id="constMV" disabled/>

                    <label for="constVisc">Viscosité :</label>
                    <input type="number" name="constVisc" id="constVisc" disabled/>
                </div>
            </div>

            <div id="resultats">
                <div id="graph">
                    <canvas id="canvasGraph"></canvas>
                </div>
            </div>
        </div>


        <script src="scriptJs/chart.js"></script>
        <script src="scriptJs/scripts.js"></script>
    </body>
</html>