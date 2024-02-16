<html>
    <head>
        <meta charset="utf-8"/>
       <title>Calcul des caractéristiques d'un tronçon de plomberie</title>
       <link rel="stylesheet" type="text/css" href="css/style.css"/>
    </head>

    <body onload="initSite()">
        <div id="formule">
            <label for="choixFormule">Formule :</label>
            <select name="choixFormule" id="choixFormule" onchange="setFormule()">
                <option value="dtu">DTU 60-11</option>
                <option value="sci">Scientifique</option>
            </select>

            <label for="valCoefA" class="valCoef">A : </label>
            <input type="number" name="valCoefA" id="a" class="valCoef" value="0.05">

            <label for="valCoefB" class="valCoef">B : </label>
            <input type="number" name="valCoefB" id="b" class="valCoef" value="0.5">
        </div>

        <div id="installSitu">
            <label for="choixInstall" onchange="setInstall()">Installation :</label>
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
            
            <div id="vitesse">
                <label for="valVit">Vitesse : </label>
                <input type="number" name="valVit" id="valVit" value="1.5">
            </div>
        </div>

        <p>Liste des appareils dont l'alimentation dépend de ce tronçon : </p>
        <div id="params">
            <div class="line1">
                <label for="valWC">WC : </label>
                <input type="number" name="valWC" id="valWC" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line1">
                <label for="valEvier">Evier : </label>
                <input type="number" name="valEvier" id="valEvier" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line1">
                <label for="valLL">Lave-Linge : </label>
                <input type="number" name="valLLinge" id="valLLinge" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line1">
                <label for="valLV">Lave-vaisselle : </label>
                <input type="number" name="valLV" id="valLV" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line2">
                <label for="valLavabo">Lavabo : </label>
                <input type="number" name="valLavabo" id="valLavabo" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line2">
                <label for="valBidet">Bidet : </label>
                <input type="number" name="valBidet" id="valBidet" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line2">
                <label for="valDouche">Douche : </label>
                <input type="number" name="valDouche" id="valDouche" class="nbApp" value="0" oninput="calculs()">
            </div>
            <div class="line2">
                <label for="valBaign">Baignoire : </label>
                <input type="number" name="valBaign" id="valBaign" class="nbApp" value="0" oninput="setBaignoire()">
            </div>

            <div class="line2" id="capBaign">
                <label for="valCapB" class="valCapB">Capacité des baignoires : </label>
                <input type="number" name="valCapB" id="valCapB" value="50" oninput="calculs()">
            </div>
        </div>

        <div id="tuyauEau">
            <label for="choixTuyau">Rugosité (en mm)</label>
            <select name="choixTuyau" id="choixTuyau" onchange="setRugo()">
                <option value="0.05">Acier (0,05)</option>
                <option value="0.005">Cuivre (0,005)</option>
                <option value="0.007">Plastique (0,007)</option>
            </select>

            <label for="choixEau">Température : </label>
            <select name="choixEau" id="choixEau" onchange="setTemp()">
                <option value=10>Eau à 10°</option>
                <option value=50>Eau à 50°</option>
                <option value=80>Eau à 80°</option>
            </select>
        </div>

        <h2 id="typeEau"></h2>
        <div id="resultats">
            <div class="col1">Débit total (en l/s) :</div>
            <div class="col2" id="resDebitT"></div>

            <div class="col1">Coéfficient de simultanéité :</div>
            <div class="col2" id="resCoef"></div>

            <div class="col1">Débit probable (en l/s) :</div>
            <div class="col2" id="resDebitP"></div>


            <div class="col3 line1">Total des coefficients :</div>
            <div class="col4 line1" id="resTotCoef"></div>

            <div class="col3 line2">Nombre d'appareils :</div>
            <div class="col4 line2" id="resNbApp"></div>

            <div class="col3 line3">Pertes de charge linéaires (mm CE/m) :</div>
            <div class="col4 line3" id="resPertCh"></div>

            <div class="col3 line4">Diamètre nominal (en mm) :</div>
            <div class="col4 line4" id="resDiaNom"></div>

            <div class="col3 line5">Vitesse (en m/s) :</div>
            <div class="col4 line5" id="resVit"></div>
        </div>

        <script src="scriptJs/scripts.js">
        </script>
    </body>
</html>