<?php

    if ($_SERVER["SCRIPT_FILENAME"] == __FILE__)
        $racine = "..";

    $lesControls = array
    (
        "default" => "accueil.php",
        "convert" => "convertisseur.php",
        "calculV" => "calculVanne.php",
        "tuyau" => "diamTuyau.php",
        "eauC" => "eauChaude.php",
        "calculP"=> "calculPlomberie.php",
        "visco" => "viscosite.php",
        "perteCR" => "perteCharges.php",
        "lambda" => "courbesLambda.php"
    );

    if (isset($_GET["utilitaire"]))
        $control = $lesControls[$_GET["utilitaire"]];
    else
        $control = $lesControls["default"];

    include "$racine/controls/$control";