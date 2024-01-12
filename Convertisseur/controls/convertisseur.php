<?php
    if ($_SERVER["SCRIPT_FILENAME"] == __FILE__)
        $racine = "..";

    include_once "$racine/models/bd.convertisseur.inc.php";

    $domaine = 1;

    $lesDomaines = getDomaines();
    $lesValeurs = getValeurByDomaine($domaine);

    include_once "$racine/views/convertisseur.php";
    