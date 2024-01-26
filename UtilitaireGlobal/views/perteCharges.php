<html>
    <head>
        <meta charset="utf-8"/>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
        <title>Pertes de charges régulières (formule de Colebrook)</title>
    </head>

    <body onload="calculPertes()" id="pertCharge">
        <div id="inputs">
            <div id="fluide">
                <label for="choixFluide">Choix du fluide : </label>
                <select name="choixFluide" id="choixFluide" onchange="setFluide()">
                    <option value=0>Saisie directe</option>
                    <option value=1>Air 10°</option>
                    <option value=2>Air 60°</option>
                    <option value=3>Eau 10°</option>
                    <option value=4>Eau 50°</option>
                    <option value=5 selected>Eau 80°</option>
                    <option value=6>Fuel BTS 5°</option>
                    <option value=7>Fuel BTS 15°</option>
                    <option value=8>Fuel BTS 25°</option>
                </select>

                <div>
                    <label for="viscos">Viscosité (en cSt) :</label>
                    <input type="number" name="viscos" id="viscos" disabled value="0.38" oninput="calculPertes()"/>

                    <label for="mVol">Masse volumique (kg/m3) :</label>
                    <input type="number" name="mVol" id="mVol" disabled value="972" oninput="calculPertes()"/>
                </div>
            </div>

            <div id="materiau">
                <label for="choixMat">Choix du matériau :</label>
                <select name="choixMat" id="choixMat" onchange="setMateriau()">
                    <option value="-1">Saisie directe</option>
                    <option value="0.05" selected>Acier</option>
                    <option value="0.005">Cuivre</option>
                    <option value="0.007">Plastique</option>
                </select>

                <label for="rugos">Rugosité (en mm) :</label>
                <input type="number" name="rugos" id="rugos" disabled value="0.05" oninput="calculPertes()"/>
            </div>

            <fieldset>
                <div>
                    <input name="choixCalc" type="radio" id="radDeb" class="choixCalc" onchange="setChoixDeb()"/>
                    <label for="debit" id="lblDebit">Débit (en l/h) :</label>
                    <input type="number" name="debit" id="debit" class="valCalc" value="600" oninput="calculChoix()"/>
                </div>

                <div>
                    <input name="choixCalc" type="radio" id="radVit" class="choixCalc" onchange="setChoixVit()"/>
                    <label for="vitesse">Vitesse (en m/s) : </label>
                    <input type="number" name="vitesse" id="vitesse" class="valCalc" value="0.5" oninput="calculChoix()"/>
                </div>

                <div>
                    <input name="choixCalc" type="radio" id="radDia" class="choixCalc" onchange="setChoixDia()" checked/>
                    <label for="diametre">Diamètre (en mm) : </label>
                    <input type="number" name="diametre" id="diametre" class="valCalc" value="20.6" oninput="calculChoix()" disabled/>
                </div>
            </fieldset>
        </div>

        <div id="gridParent">
            <div class="gridChild">Nombre de Reynolds :</div>
            <div class="gridChild" id="nbReyn"></div>

            <div class="gridChild">Régime :</div>
            <div class="gridChild" id="regime"></div>

            <div class="gridChild">Coefficient Lambda :</div>
            <div class="gridChild" id="coefLambda"></div>

            <div class="gridChild">Pertes de charge (Pa/m) :</div>
            <div class="gridChild" id="perteCharge"></div>
        </div>
        <script src="scriptJs/scriptsPertes.js"></script>
    </body>
</html>