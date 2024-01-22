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
function calculG()
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
function calculM()
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
function lesCalculs()
{
    calculG();
    calculM();
}