//Déclaration des données sur l'axe X
let donneesX = [10**3, 3000, 10**4, 10**5, 10**6, 10**7, 10**8];

function calculColebrook(rapport, reynolds)
{
    coefA = rapport / 3.71;
    coefB = 2.51 / (reynolds);
    x1 = 10;

    do
    {
        x = x1;
        x1 = x - (x + 2 / Math.log(10) * Math.log(coefA + coefB * x)) / (1 + (2 / Math.log(10) * coefB / (coefA + coefB * x)));
    }
    while (Math.abs(x - x1) >= 0.0000001);

    return 1 / (x1**2);
}


function getData(rapport)
{
    data = [];
    for (i = 0; i < donneesX.length; i++)
        data.push(calculColebrook(rapport, donneesX[i]));

    return data;
}


function drawCourbes()
{
    gridCourbes = document.getElementById("gridCourbes");
    ctx = gridCourbes.getContext("2d");

    ctx.fillStyle = "rgb(196, 196, 196)";

    dataCourbe1 = getData(0.2);
    dataCourbe2 = getData(0.1);
    dataCourbe3 = getData(0.05);
    dataCourbe4 = getData(0.03);
    dataCourbe5 = getData(0.01);
    dataCourbe6 = getData(0.004);
    dataCourbe7 = getData(0.001);
    dataCourbe8 = getData(0.00005);
    dataCourbe9 = getData(0.00001);

    donneesGraph = 
    {
        labels : donneesX,
        datasets : [{
            label : "k/D = 0.2",
            borderColor : "rgba(255, 206, 86, 1)",
            data : dataCourbe1,
            fill : false
        },
        {
            label : "k/D = 0.1",
            border : "rgba(255, 86, 206, 1)",
            data : dataCourbe2,
            fill : false
        },
        {
            label : "k/D = 0.05",
            borderColor : "rgba(206, 255, 86, 1)",
            data : dataCourbe3,
            fill : false
        },
        {
            label : "k/D = 0.03",
            borderColor : "rgba(206, 86, 255, 1)",
            data : dataCourbe4,
            fill : false
        },
        {
            label : "k/D = 0.1",
            borderColor : "rgba(86, 255, 206, 1)",
            data : dataCourbe5,
            fill : false
        },
        {
            label : "k/D = 0.004",
            borderColor : "rgba(86, 206, 255, 1)",
            data : dataCourbe6,
            fill : false
        },
        {
            label : "k/D = 0.001",
            borderColor : "rgba(255, 86, 255, 1)",
            data : dataCourbe7,
            fill : false
        },
        {
            label : "k/D = 0.00005",
            borderColor : "rgba(206, 86, 206, 1)",
            data : dataCourbe8,
            fill : false
        },
        {
            label : "k/D = 0.00001",
            borderColor : "rgba(86, 255, 86, 1)",
            data : dataCourbe9,
            fill : false
        }]
    };

    myBarChat = new Chart(gridCourbes,
    {
        type: "line",
        data: donneesGraph,
        options:
        {
            legend : { display : false },
            annotation : 
            {
                annotations :
                [{
                    drawTime : "afterDatasetsDraw",
                    type : "line",
                    mode : "vertical",
                    scaleID : "x-axis-0",
                    value : 2,
                    borderWidth : 15,
                    borderColor : "black",
                    label :
                    {
                        content : "test",
                        enabled : true,
                        position : "top"
                    }
                }]
            },
            scales:
            {
                xAxes:
                [{
                    scaleLabel:
                    {
                        display: true,
                        labelString: "Nombre de Reynolds (Re)"
                    }
                }],
                yAxes:
                [{
                    ticks: { beginAtZero: true },
                    scaleLabel:
                    {
                        display: true,
                        labelString: "Lambda"
                    }
                }]
            }
        }
    });
}