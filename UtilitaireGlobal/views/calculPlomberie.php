<html>
    <head>
       <title>Calcul des caractéristiques d'un tronçon de plomberie</title>
       <meta charset="utf-8"/>
       <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
       ?>
    </head>

    <body onload="calculs()">
        <div id="formule">
            <label for="choixFormule">Formule :</label>
            <select name="choixFormule" id="choixFormule" onchange="setFormule()">
                <option value="dtu">DTU 60-11</option>
                <option value="sci">Scientifique</option>
            </select>

            <label for="valCoefA" class="valCoef">A : </label>
            <input type="number" name="valCoefA" id="A" class="valCoef">

            <label for="valCoefB" class="valCoef">B : </label>
            <input type="number" name="valCoefB" id="B" class="valCoef">
        </div>

        <div id="installSitu">
            <label for="choixInstall">Installation :</label>
            <select name="choixInstall" id="choixInstall">
                <option value="indiv">Individuelle</option>
                <option value="collec">Collective</option>
            </select>

            <label for="choixSitu">Situation :</label>
            <select name="choixSitu" id="choixSitu">
                <option value="domHabi">Domaine habitable</option>
                <option value="ColMont">Colonne montante</option>
                <option value="sSolVid">Sous-sol ou vide sanitaire</option>
                <option value="entreeL">Entrée de logement</option>
            </select>

            <label for="valVit">Vitesse : </label>
            <input type="number" name="valVit" id="valVit">
        </div>

        <div id="params">
            <p>Liste des appareils dont l'alimentation dépend de ce tronçon : </p>
            <div>
                <label for="valWC">WC : </label>
                <input type="number" name="valWC" id="valWC" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valEvier">Evier : </label>
                <input type="number" name="valEvier" id="valEvier" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valLL">Lave-Linge : </label>
                <input type="number" name="valLLinge" id="valLLinge" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valLV">Lave-vaisselle : </label>
                <input type="number" name="valLV" id="valLV" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valLavabo">Lavabo : </label>
                <input type="number" name="valLavabo" id="valLavabo" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valBidet">Bidet : </label>
                <input type="number" name="valBidet" id="valBidet" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valDouche">Douche : </label>
                <input type="number" name="valDouche" id="valDouche" class="valNbApp" value="0" oninput="calculs()">
            </div>
            <div>
                <label for="valBaign">Baignoire : </label>
                <input type="number" name="valBaign" id="valBaign" class="valNbApp" value="0" oninput="setBaignoire()">
            </div>

            <div>
                <label for="valCapB" class="valCapB">Capacité des baignoires : </label>
                <input type="number" name="valCapB" class="valCapB" value="50" oninput="calculs()">
            </div>
        </div>

        <div id="tuyauEau">
            <label for="choixTuyau">Rugosité (en mm)</label>
            <select name="choixTuyau" id="choixTuyau">
                <option value="0.05">Acier (0,05)</option>
                <option value="0.005">Cuivre (0,005)</option>
                <option value="0.007">Plastique (0,007)</option>
            </select>

            <label for="choixEau">Température : </label>
            <select name="choixEau" id="choixEau">
                <option value=10>Eau à 10°</option>
                <option value=50>Eau à 50°</option>
                <option value=80>Eau à 80°</option>
            </select>
        </div>

        <div id="resultats">
            <h2 id="typeEau"></h2>

            <label for="resDebitT">Débit total (en l/s) :</label>
            <input name="resDebitT" id="resDebitT" disabled/>

            <label for="resCoef">Coéfficient de simultanéité :</label>
            <input name="resCoef" id="resCoef" disabled/>

            <label for="resDebitP">Débit probable (en l/s) :</label>
            <input name="resDebitP" id="resDebitP" disabled/>

            <label for="resTotCoef">Total des coefficients :</label>
            <input name="resTotCoef" id="resTotCoef" disabled/>

            <label for="resNbApp">Nombre d'appareils :</label>
            <input name="resNbApp" id="resNbApp" disabled/>

            <label for="resPertCh">Pertes de charge linéaires (mm CE/m) :</label>
            <input name="resPertCh" id="resPertCh" disabled/>

            <label for="resDiaNom">Diamètre nominal (en mm) :</label>
            <input name="resDiaNom" id="resDiaNom" disabled/>

            <label for="resVit">Vitesse (en m/s) :</label>
            <input name="resVit" id="resVit" disabled/>
        </div>

        <script src="scriptJs/scripts.js">
        </script>
    </body>
</html>