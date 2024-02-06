<html>
    <head>
        <meta charset="utf-8"/>
        <title>Courbes de Lambda</title>
        <?php
            if (isset($_GET["type"]) && $_GET["type"] == "appli")
                echo '<link rel="stylesheet" type="text/css" href="css/styleApp.css"/>';
            else
                echo '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
        ?>
    </head>

    <body onload="drawCourbes()">
        <div id="divCanvas">
            <canvas id="gridCourbes"></canvas>
        </div>

        <script src="scriptJs/chart.js"></script> 
        <script src="scriptJs/scriptsLambda.js"></script>
    </body>
</html>