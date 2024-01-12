<?php

use function PHPSTORM_META\type;

    $racine = "..";

    include_once "$racine/models/bd.inc.php";
    include_once "$racine/models/bd.convertisseur.inc.php";

    function getValeurByDomaineJSON($idDomaine)
    {
        $lesValeurs = getValeurByDomaine($idDomaine);
        header('Content-Type: application/json');
        echo json_encode(array_map(function ($item)
        {
            return
            [
                'id' => $item["id"],
                'idDomaine' => $item["idDomaine"],
                'libelleSym' => $item["libelleSym"],
                'libelleComplet' => $item["libelleComplet"],
                'isValRef' => $item["isValRef"]
            ];
        }, $lesValeurs));
    }

    function getRapportByValeurJSON($idValeur)
    {
        $leRapport = getRapportByValeur($idValeur);
        header('Content-Type: application/json');
        echo json_encode(array_map(function ($item)
        {
            return
            [
                'idValRef' => $item["idValRef"],
                'idValConv' => $item["idValConv"],
                'rapport' => $item["rapport"]
            ];
        }, $leRapport));
    }

    function calculJSON($value, $idStart)
    {
        $lesRes = array();
        $leDomaine = getDomaineByValeur($idStart);
        $lesValeurs = getValeurByDomaine($leDomaine["id"]);
        $rapportRes = getRapportByValeur($idStart)["rapport"];


        for ($i = 0; $i < sizeof($lesValeurs); $i++)
        {
            if ($lesValeurs[$i]["id"] != $idStart)
            {
                $rapportFin = getRapportByValeur($lesValeurs[$i]["id"])["rapport"];
                $libFin = getLibelleValeur($lesValeurs[$i]["id"]);

                if ($leDomaine["libelle"] == "Temperature")
                {
                    $res = $value;
                    $rapport = 273.15;
                    $libStart = getLibelleValeur($idStart);

                    if($libStart["libelleComplet"] == "Degré Fahrenheit")
                        $res = convertFahrenheit($value, true);
                    elseif ($libStart["libelleComplet"] == "Degré Celsius")
                        $res = $value + $rapport;

                    
                    if ($libFin["libelleComplet"] == "Degré Fahrenheit")
                        $res = convertFahrenheit($res, false);
                    elseif ($libFin["libelleComplet"] == "Degré Celsius")
                        $res = $res - $rapport;
                }
                else
                    $res = ($value * $rapportFin) / $rapportRes;

                $lesRes[] = array(round($res, 7), $libFin["libelleSym"]);
            }
        }

        header('Content-Type: application/json');
        echo json_encode(array_map(function ($item)
        {
            return
            [
                'res' => $item[0],
                'libRes' => $item[1]
            ];
        }, $lesRes));
    }

    function convertFahrenheit($val, $fromF)
    {
        if ($fromF)
            $val = ($val - 32) * (5/9) + 273.15;
        else
            $val = ($val - 273.15) * (9/5) + 32;

        return $val;
    }


    if($_GET["type"] == "calcul")
        $res = calculJSON($_GET["value"], $_GET["idStart"]);
    else
    {
        if($_GET["type"] == "domaine")
            $res = getValeurByDomaineJSON($_GET["id"]);
        else
            $res = getRapportByValeurJSON($_GET["id"]);
    }