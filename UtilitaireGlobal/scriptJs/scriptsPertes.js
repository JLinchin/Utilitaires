function setChoixDeb()
{
    debit = document.getElementById("debit");
    valCalc = document.getElementsByClassName("valCalc");

    for (i = 0; i < valCalc.length; i++)
        valCalc[i].disabled = false;

    debit.disabled = true;
}

function setChoixVit()
{
    vitesse = document.getElementById("vitesse");
    valCalc = document.getElementsByClassName("valCalc");

    for (i = 0; i < valCalc.length; i++)
        valCalc[i].disabled = false;

    vitesse.disabled = true;
}

function setChoixDia()
{
    diametre = document.getElementById("diametre");
    valCalc = document.getElementsByClassName("valCalc");

    for (i = 0; i < valCalc.length; i++)
        valCalc[i].disabled = false;

    diametre.disabled = true;
}

function setFluide()
{
    tabVisc = ["", 12.8, 11.1, 1.30, 0.56, 0.38, 45, 28, 17];
    tabMVol = ["", 1.235, 1.05, 1000, 988, 972, 916, 910, 904];

    choixFluide = document.getElementById("choixFluide").value;
    viscos = document.getElementById("viscos");
    mVol = document.getElementById("mVol");

    console.log(choixFluide);
    
    if (choixFluide == 0)
    {
        viscos.disabled = false;
        mVol.disabled = false;
    }

    else
    {
        viscos.disabled = true;
        mVol.disabled = true;

        viscos.value = tabVisc[choixFluide];
        mVol.value = tabMVol[choixFluide];
    }

    calculPertes()
}

function setMateriau()
{
    choixMat = document.getElementById("choixMat").value;
    rugos = document.getElementById("rugos");

    if (choixMat < 0)
        rugos.disabled = false;
    else
    {
        rugos.disabled = true;
        rugos.value = choixMat;
    }

    calculPertes();
}

function calculChoix()
{
    valCalc = document.getElementsByClassName("valCalc");
    debit = document.getElementById("debit");
    vitesse = document.getElementById("vitesse");
    diametre = document.getElementById("diametre");

    for (i = 0; i < valCalc.length; i++)
    {
        if (valCalc[i].disabled)
        {
            switch (valCalc[i].id)
            {
                case "debit":
                    debit.value = (vitesse.value * (diametre.value / 1000)**2 * ((Math.PI * 3600) / (4 * 0.001))).toFixed(3);
                    if (debit.value > 1000)
                    {
                        debit.value = (debit.value / 1000).toFixed(3);
                        document.getElementById("lblDebit").innerHTML = "Débit (en m\u00b3 par h)";
                    }
                    else
                        document.getElementById("lblDebit").innerHTML = "Débit (en l par h)";

                    break;
                
                case "diametre":
                    document.getElementById("lblDebit").innerHTML = "Débit (en l par h)";
                    diametre.value = (1000 * Math.sqrt(((debit.value / 3600) * 0.001 * 4) / (vitesse.value * Math.PI))).toFixed(3);
                    break;

                case "vitesse":
                    document.getElementById("lblDebit").innerHTML = "Débit (en l par h)";
                    vitesse.value = (((debit.value * 0.001) / 3600) / ((diametre.value / 1000)**2 * (Math.PI / 4))).toFixed(3);
                    break;
            }
        }
    }

    calculPertes();
}

function calculLambda(vitesse, diametre, rugosite, viscosite)
{
    x = 0;

    coef1 = rugosite / (3.71 * diametre);
    coef2 = 2.51 / ((vitesse * diametre * 1000) / viscosite);

    x1 = 10;

    do
    {
        x = x1;
        x1 = x - (x + 2 / Math.log(10) * Math.log(coef1 + coef2 * x)) / (1 + (2 / Math.log(10) * coef2 / (coef1 + coef2 * x)));
    }
    while (Math.abs(x - x1) >= 0.0000001);

    return 1 / x1**2;
}

function calculPertes()
{
    //debit = document.getElementById("debit").value * 1000;
    vitesse = document.getElementById("vitesse").value;
    diametre = document.getElementById("diametre").value;
    mVol = document.getElementById("mVol").value;
    viscos = document.getElementById("viscos").value;
    rugos = document.getElementById("rugos").value;

    lambda = calculLambda(vitesse, diametre, rugos, viscos);
    console.log(vitesse + " " + diametre + " " + viscos);
    perteCharges = mVol * lambda * (vitesse**2 / (2 * diametre / 1000));
    rey = vitesse * diametre * 1000 / viscos;

    nbReyn = document.getElementById("nbReyn");
    regime = document.getElementById("regime");
    coefLambda = document.getElementById("coefLambda");
    perteCharge = document.getElementById("perteCharge");

    nbReyn.innerHTML = parseInt(rey);
    coefLambda.innerHTML = lambda.toFixed(3);
    perteCharge.innerHTML = perteCharges.toFixed(3);

    if (rey > 3000)
        regime.innerHTML = "Turbulent";
    else
        regime.innerHTML = "Laminaire";
}