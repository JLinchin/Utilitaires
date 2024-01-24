<?php

    if ($_SERVER["SCRIPT_FILENAME"] == __FILE__)
        $racine = "..";

    include_once "$racine/models/bd.inc.php";

    function getDomaines()
    {
        $lesDomaines = array();

        try
        {
            $cnx = connexionPDO();
            $req = "Select * from Domaine";

            $listDomaines = $cnx->prepare($req);
            $listDomaines->execute();

            while ($unDomaine = $listDomaines->fetch(PDO::FETCH_ASSOC))
            {
                $lesDomaines[] = $unDomaine;
            }
        }

        catch (PDOException $e)
        {
            print "Erreur de connexion à la base";
            die();
        }

        return $lesDomaines;
    }

    function getValeurByDomaine($idDomaine)
    {
        $lesValeurs = array();

        try
        {
            $cnx = connexionPDO();
            $req = "Select * from Valeur where idDomaine = :idDomaine";

            $query = $cnx->prepare($req);
            $query->bindValue(":idDomaine", $idDomaine, PDO::PARAM_INT);
            $query->execute();

            $lesValeurs = $query->fetchAll();
        }

        catch (PDOException $e)
        {
            print "Erreur de connexion à la base";
            die();
        }

        return $lesValeurs;
    }

    function getLibelleValeur($idValeur)
    {
        try
        {
            $cnx = connexionPDO();
            $req = "Select libelleComplet, libelleSym from Valeur where id = :id";

            $query = $cnx->prepare($req);
            $query->bindValue(":id", $idValeur, PDO::PARAM_INT);
            $query->execute();

            $leLibelle = $query->fetch(PDO::FETCH_ASSOC);
        }

        catch(PDOException $e)
        {
            print "Erreur de connexion à la base";
            die();
        }

        return $leLibelle;
    }

    function getRapportByValeur($idValeur)
    {
        try
        {
            $cnx = connexionPDO();
            $req = "Select * from EstEgal where idValConv = :idValConv";

            $query = $cnx->prepare($req);
            $query->bindValue(":idValConv", $idValeur, PDO::PARAM_INT);
            $query->execute();

            $leRapport = $query->fetch();
        }

        catch(PDOException $e)
        {
            print "Erreur de connexion à la base";
            die();
        }

        return $leRapport;
    }

    function getDomaineByValeur($idValeur)
    {
        try
        {
            $cnx = connexionPDO();
            $req = "Select d.id, d.libelle From Domaine d Inner Join Valeur v on d.id = v.idDomaine where v.id = :idValeur";

            $query = $cnx->prepare($req);
            $query->bindValue(":idValeur", $idValeur, PDO::PARAM_INT);
            $query->execute();

            $leDomaine = $query->fetch(PDO::FETCH_ASSOC);
        }

        catch (PDOException $e)
        {
            print "Erreur de connexion à la base";
            die();
        }

        return $leDomaine;
    }