let tabDebit = [50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
let tabVit = [0.1, 0.2, 0.5, 0.8, 1, 1.5, 2, 5, 10];


function calculVanne()
{
    hauteur = document.getElementById("valHaut").value;
    debit = document.getElementById("valDebit").value;
    coefRes = document.getElementById("coefRes");

    kv = Math.sqrt((debit**2 * 0.1) / hauteur).toFixed(2);

    coefRes.innerHTML = kv;
}



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



function calculLambda(debit, diametre)
{
    coefA = 0.05 / 3.71 / diametre;
    coefB = 2.51 / (353.7 * debit / diametre / 0.36);

    x1 = 10;
    do
    {
        x = x1;
        x1 = x - (x + 2 / Math.log(10) * Math.log(coefA + coefB * x)) / (1 + (2 / Math.log(10) * coefB / (coefA + coefB * x)));
    } while (Math.abs(x - x1) >= 0.0000001);

    return 1/(x**2);
}

function fillGridTuy(value)
{
    tableRes = document.getElementById("tableRes");

    divFill = document.createElement("div");
    divFill.className = "childGrid";
    divFill.innerHTML = value;

    tableRes.append(divFill);
}

function calculDiamTuy()
{
    //Récupération des variables
    vitL = parseFloat(document.getElementById("valVitL").value);
    vitT = parseFloat(document.getElementById("valVitT").value);
    debit = parseFloat(document.getElementById("valDebit").value);

    //Récupération des éléments dans lesquels seront insérés les résultats
    diamOpti = document.getElementById("diamOpti");
    vitOpti = document.getElementById("vitOpti");
    pertOpti = document.getElementById("perteOpti");
    tableRes = document.getElementById("tableRes");

    //Réinitialisation de la grille des résultats
    while (tableRes.hasChildNodes())
        tableRes.removeChild(tableRes.firstChild);

    //Teste si les variables saisies sont correctes (si oui, on effectue les calculs)
    if (debit >= 0.5 && debit <= 9999999 && vitL <= vitT/2 && vitL >= 0.1 && vitL <= 1 && vitT >= 0.5 && vitT <= 4)
    {
        //Calcul des valeurs optimales
        tuyauA = (25 * vitL - 4 * vitT) / 21;
        tuyauB = (vitT - vitL) / 21;;
        vitesse = (tuyauA + tuyauB * (Math.log(debit) / 2.3026)**2);

        diametre = (Math.sqrt(4 / (Math.PI * 3.6) * debit / vitesse));

        pdc = calculLambda(debit, diametre) * 6.37 * 1000 * 9.81;
        perteCharge = (pdc / diametre**5 * debit**2);

        diamOpti.innerHTML = diametre.toFixed(2);
        vitOpti.innerHTML = vitesse.toFixed(2);
        pertOpti.innerHTML = perteCharge.toFixed(2);

        fillGridTuy("Débit en l/h");
        fillGridTuy("Diamètre en mm");
        fillGridTuy("Vitesse en m/s");
        fillGridTuy("PdC en Pa/mm");

        //Calcul des valeurs du tableau
        for (i = 0; i < tabDebit.length; i++)
        {
            tuyauA = (25 * vitL - 4 * vitT) / 21;
            tuyauB = (vitT - vitL) / 21;;
            vitesse = (tuyauA + tuyauB * (Math.log(tabDebit[i]) / 2.3026)**2);

            diametre = (Math.sqrt(4 / (Math.PI * 3.6) * tabDebit[i] / vitesse));

            pdc = calculLambda(tabDebit[i], diametre) * 6.37 * 1000 * 9.81;
            perteCharge = (pdc / diametre**5 * tabDebit[i]**2);

            fillGridTuy(tabDebit[i]);
            fillGridTuy(diametre.toFixed(2));
            fillGridTuy(vitesse.toFixed(2));
            fillGridTuy(perteCharge.toFixed(2));
        }
    }
}



function changeRugo()
{
    selMat = document.getElementById("selMat").value;
    valRug = document.getElementById("valRug");

    if (selMat < 0)
        valRug.disabled = false;

    else
    {
        valRug.value = selMat;
        valRug.disabled = true;
    }

    calculEauChaude();
}

function calculCoef(vites, debit, rugos)
{
    x = 0
    vites = vites == 0 ? 0 : vites;

    coef1 = rugos / (3.71 * debit);
    coef2 = 2.51 / ((vites * debit * 1000) / 0.38);

    x1 = 10;
    do
    {
        x = x1;
        x1 = x - (x + 2 / Math.log(10) * Math.log(coef1 + coef2 * x)) / (1 + (2 / Math.log(10) * coef2 / (coef1 + coef2 * x)));
    }
    while (Math.abs(x - x1) >= 0.0000001);

    return 1 / (x1**2);
}

function createGridEauC()
{
    gridParent = document.getElementById("gridParent");

    tabDia = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    divNom = document.createElement("div");
    divNom.className = "gridChild line1 col1";
    divNom.innerHTML = "XXX";
    gridParent.append(divNom);

    divNom = document.createElement("div");
    divNom.className = "gridChild line0";
    divNom.innerHTML = "Diamètre en mm";
    gridParent.append(divNom);

    divNom = document.createElement("div");
    divNom.className = "gridChild col0";
    divNom.innerHTML = "Vitesse (en m/s)";
    gridParent.append(divNom);

    for (i = 0; i < 9; i++)
    {
        divUnit = document.createElement("div");

        divUnit.classList.add("gridChild", "col1");
        posCol = "line" + (i + 2);
        divUnit.classList.add(posCol);

        divUnit.innerHTML = tabVit[i];
        gridParent.append(divUnit);
    }

    for (i = 0; i < 9; i++)
    {
        divUnit = document.createElement("div");

        divUnit.classList.add("gridChild", "line1");
        posLine = "col" + (i + 2);
        divUnit.classList.add(posLine);

        divUnit.innerHTML = tabDia[i];
        gridParent.append(divUnit);
    }
}

function fillGridEauC(tabRes)
{
    gridParent = document.getElementById("gridParent");

    for (i = 0; i < 9; i++)
    {
        for (j = 0; j < 9; j++)
        {
            divValue = document.createElement("div");
            
            posCol = "col" + (j + 2);
            divValue.classList.add("gridChild", posCol);

            divValue.innerHTML = tabRes[i][j];

            gridParent.append(divValue);
        }
    }
}

function calculEauChaude()
{
    valRug = document.getElementById("valRug").value;
    gridParent = document.getElementById("gridParent");

    while (gridParent.hasChildNodes())
        gridParent.removeChild(gridParent.firstChild);

    if (valRug > 0 )
    {
        tabRes = [];
        for (i = 0; i < 9; i++)
        {
            tabLineRes = [];

            for (j = 1; j < 10; j++)
            {
                res = 972 * calculCoef(tabVit[i], (j * 10), valRug) * 
                ((tabVit[i])**2 / ((2 * j * 10) / 1000));

                res = res <= 10000 ? res.toFixed(1) : "";

                tabLineRes.push(res);
            }

            tabRes.push(tabLineRes);
        }
    }

    createGridEauC();
    
    if (valRug > 0)
        fillGridEauC(tabRes);
}



//Suppression et recréation du canvas
function resetCanvas()
{
    leCanvas = document.getElementById("canvasGraph");
    divCanvas = leCanvas.parentNode;
    divCanvas.removeChild(leCanvas);

    canvas = document.createElement("canvas");
    canvas.id = "canvasGraph";
    divCanvas.appendChild(canvas);
}

//Création d'un plugin pour utiliser des fonctions
Chart.pluginService.register
({
    beforeInit: function(chart)
    {
        data = chart.config.data;
        for (i = 0; i < data.datasets.length; i++)
        {
            for (j = 0; j < data.labels.length; j++)
            {
                fct = data.datasets[i].function,
                    x = data.labels[j],
                    y = fct(x, altit);
                data.datasets[i].data.push(y);
            }
        }
    }
});

//Calcul et affichage de la masse volumique et de la viscosité en fonction de l'altitude sous la forme d'un graphique
function calculCanvas()
{
    //Suppression et rectréation du canvas
    resetCanvas();

    //Déclaration des variables
    altit = parseFloat(document.getElementById("valAlti").value);
    leCanvas = document.getElementById("canvasGraph");
    anciensGraph = document.getElementsByClassName("chartjs-hidden-iframe");
    ctx = leCanvas.getContext("2d");

    //Déclaration des valeurs sur l'axe X
    listX = [];
        for (i = -5; i < 61; i++)
            listX.push(i);

    ctx.fillStyle = "rgb(196, 196, 196)";

    //Création des listes de données
    doneesGraph =
    {
        labels: listX,
        datasets: [{
            label: "masse volumique (kg/m^3)",
            function: function(x, altit) { return ((0.0000000119745 * Math.exp(Math.log(288.15 - 0.0065 * altit) * 5.25588)) / ((x + 273.15) * 287)).toFixed(4)},
            borderColor: "rgba(255, 206, 86, 1)",
            data: [],
            fill: false
        },
        {
            label: "viscosité (centistoke)",
            function: function(x, altit) { return ((171.2 * (384 / (111 + x + 273.15)) * ((x + 273.15) / 273.15)**1.5) / ((0.0000000119745 * Math.exp(Math.log(288.15 - 0.0065 * altit) * 5.25588)) / ((x + 273.15) * 287)) / 10).toFixed(4); },
            borderColor: "rgba(86, 206, 255, 1)",
            data: [],
            fill: false
        }]
    };

    //Création du graphe avec les listes de données
    myBarChat = new Chart(leCanvas, 
    {
        type: "line",
        data: doneesGraph,
        options:
        {
            scales:
            {
                xAxes:
                [{
                    scaleLabel:
                    {
                        display: true,
                        labelString: "Température (°C)"
                    },
                    ticks:
                    {
                        autoSkip: true,
                        maxTicksLimit: 2
                    }
                }],
                yAxes:
                [{
                    ticks: { beginAtZero: true }
                }]
            }
        }
    });

    for (i = 0; i < anciensGraph.length; i++)
        divCanvas.removeChild(divCanvas.firstChild);
}

//Calcul et affichage de la masse volumique et de la viscosité en fonction de l'altitude et de la température
function calculManuel()
{
    altit = parseFloat(document.getElementById("valAlti").value);
    temp = parseFloat(document.getElementById("valTemp").value);
    constMV = document.getElementById("constMV");
    constVisc = document.getElementById("constVisc");

    mVol = ((0.0000000119745 * Math.exp(Math.log(288.15 - 0.0065 * altit) * 5.25588)) / ((temp + 273.15) * 287)).toFixed(4);
    visc = 171.2 * (384 / (111 + temp + 273.15)) * ((temp + 273.15) / 273.15)**1.5;
    visc = (visc / mVol / 10).toFixed(4);

    constMV.value = mVol;
    constVisc.value = visc;
}

//Calcul et affichage de la masse volumique et de la viscosité
function calculsViscos()
{
    calculCanvas();
    calculManuel();
}