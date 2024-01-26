<html>
    <head>
        <meta charset="utf-8"/>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
        <title>Calcul du Kv des vannes</title>
    </head>

    <body onload="calculVanne()">
        <div id="variables">
            <div>
                <label for="valHaut">Hauteur manomètrique (en Pa) : </label>
                <input type="number" name="valHaut" id="valHaut" value="10000" oninput="calculVanne()"/>
            </div>

            <div>
                <label for="valDebit">Débit traversant la vanne (en m/h) : </label>
                <input type="number" name="valDebit" id="valDebit" value="100" oninput="calculVanne()"/>
            </div>
        </div>

        <div id="resultats">
            <div id="valeurRes">
                <p>Coéfficient caractéristique Kv : </p>
                <p id="coefRes"></p>
            </div>
            <div id="formuleRes">
                <p>Formule de calcul de Kv : </p>
                <p>$$Kv = {\sqrt{0.1 * Q^2 \over dPv}}$$</p>
                <p>Avec 
                    <p>Q   : débit en l/h</p>
                    <p>dPv : hauteur manométrique en Pa</p>
                </p>
            </div>
        </div>

        <script src="scriptJs/scriptsVanne.js"></script>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </body>
</html>