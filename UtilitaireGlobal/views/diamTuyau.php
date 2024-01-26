<html>
    <head>
        <meta charset="utf-8"/>
        <title>Optimisation du diamètre des tuyauteries</title>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
    </head>
    <body  onload="calculDiamTuy()">
        <div id="inputs">
            <div>
                <label for="valVitL">Vitesse limite pour un débit de 100 l/h : </label>
                <input type="number" name="valVitL" id="valVitL" value="0.25" oninput="calculDiamTuy()"/>
            </div>

            <div>
                <label for="valVitT">de 100 t/h : </label>
                <input type="number" name="valVitT" id="valVitT" value="1.25" oninput="calculDiamTuy()"/>
            </div>

           <div> 
                <label for="valDebit">Débit (en l/h) : </label>
                <input type="number" name="valDebit" id="valDebit" value="1000" oninput="calculDiamTuy()"/>
        
            </div>
        </div>

        <div id="resultats">
            <div id="resOpti">
                <div>
                    <p>Diamètre optimal (en mm) : </p>
                    <p id="diamOpti"></p>
                </div>    
            
                <div>
                    <p>Vitesse (en m/s) : </p>
                    <p id="vitOpti"></p>
                </div>

                <div>
                    <p>Pertes de charge (en Pa/m) : </p>
                    <p id="perteOpti"></p>
                </div>
            </div>

            <div id="tableRes">
                <div>Débit en l/h</div>
                <div>Diamètre en mm</div>
                <div>Vitesse en m/s</div>
                <div>PdC en Pa/m</div>
            </div>
        </div>

        <script src="scriptJs/scriptsTuyau.js"></script>
    </body>
</html>