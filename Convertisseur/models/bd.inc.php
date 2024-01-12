<?php

function connexionPDO()
{
    $login = "root";
    $mdp = "";
    $bd = "convertisseur";
    $serveur = "localhost";

    try
    {
        $pdo = new PDO("mysql:host=$serveur;dbname=$bd", $login, $mdp);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    catch (PDOException $e)
    {
        print "Echec connexion à la base";
        die();
    }
}

if ($_SERVER["SCRIPT_FILENAME"] == __FILE__)
{
    header('Content-Type:text/plain');

    echo "connexionPDO() : \n";
    print_r(connexionPDO());
}