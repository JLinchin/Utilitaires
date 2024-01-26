/*
function setTypeDomaine()
{
    var idDomaine = document.getElementById("domaine").value;
    document.getElementById("testDomaine").innerHTML = "Domaine choisi : " + idDomaine;
    getValeursByDomaine(idDomaine);
}
*/

async function setTypeDomaine()
{
    //Récupération du type de domaine et des unités correspondantes
    idDomaine = document.getElementById("domaine").value;
    res = document.getElementById("res");
    response = await fetch('http://localhost/Utilitaires/UtilitaireGlobal/models/bd.valeur.inc.php?type=domaine&id=' + idDomaine);
    data = await response.json();

    //Suppression des unités de la liste déroulante
    valeurStart = document.getElementById("selectStart");
    while (valeurStart.options.length > 0)
    {
        valeurStart.remove(0);
    }

    //Chargement des nouvelles unités dans la liste déroulante
    var option;
    for (var i = 0; i < data.length; i++)
    {
        option = document.createElement("option");
        option.text = data[i].libelleSym + " - " + data[i].libelleComplet;
        option.value = data[i].id;
        valeurStart.add(option);
    }

    setTypeValeur();
}

function setTypeValeur()
{
    convertion();
}

async function convertion()
{
    idStart = document.getElementById("selectStart").value;
    val = document.getElementById("valeurText").value;
    lesRes = [];
    //tableRes = document.getElementById("tableRes");
    gridRes = document.getElementsByClassName("gridResult");

    if (val != "")
    {
        response = await fetch('http://localhost/Utilitaires/Convertisseur/models/bd.valeur.inc.php?type=calcul&value=' + val + "&idStart=" + idStart);
        data = await response.json();
        
        for (i = 0; i < data.length; i++)
        {
            lesRes.push([data[i].res, data[i].libRes]);

        }
    }

    
    /*while(tableRes.hasChildNodes())
        tableRes.removeChild(tableRes.firstChild)

    for (i = 0; i < lesRes.length; i++)
    {
        row = tableRes.insertRow(-1);
        cellres = row.insertCell(0);
        celllib = row.insertCell(1);

        cellres.innerHTML = lesRes[i][0];
        celllib.innerHTML = lesRes[i][1];
    }*/

    while (gridRes[0].hasChildNodes())
        gridRes[0].removeChild(gridRes[0].firstChild);

        for (i = 0; i < data.length; i++)
        {
            divRes = document.createElement("div");
            divRes.className = "valConvert";
            divRes.innerHTML = lesRes[i][0];
            gridRes[0].append(divRes);

            divUnit = document.createElement("div");
            divUnit.className = "unite";
            divUnit.innerHTML = lesRes[i][1];
            gridRes[0].append(divUnit);
        }
}