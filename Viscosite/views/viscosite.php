<html>
    <head>
        <title>Calcul viscosité de l'air / masse volumique</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
    </head>

    <body onload="lesCalculs()">
        <div>
            <label for="valAlti">Altitude de clacul (en m) :</label>
            <input type="number" name="valAlti" id="valAlti" value="200" oninput="lesCalculs()"/>
        </div>

        <div id="calcRes">
            <div id="calculs">
                <p>Calcul manuel</p>
                <div id="saisis">
                   <label for="valTemp">Température (en °C) :</label>
                   <input type="number" name="valTemp" id="valTemp" value="20" oninput="calculM()"/> 
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

                <div id="valCurs">
                    <label for="mousTemp">Température (en °C) :</label>
                    <input type="number" name="mousTemp" disabled/>

                    <label for="mousMV">Masse volumique :</label>
                    <input type="number" name="mousMV" disabled/>

                    <label for="mousVisc">Viscosité :</label>
                    <input type="number" name="mousVisc" disabled/>
                </div>
            </div>
        </div>


        <script src="scriptJs/chart.js"></script>
        <script src="scriptJs/scripts.js"></script>
    </body>
</html>