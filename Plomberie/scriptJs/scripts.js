let coefTab = [0.5, 2.5, 1, 1, 1.5, 2, 2, 3];
let debFroid = [0.12, 0.2, 0.2, 0.1, 0.2, 0.2, 0.2, 0.33];
let debChaud = [0, 0.2, 0.2, 0, 0.2, 0.2, 0, 0.33];
let valDiam = [10.88, 10.88, 12.25, 13.38, 14.44, 15.25, 16, 16.75, 17.38, 18, 18.5, 19.06, 19.5, 20.06, 20.06];
let diaMin = [10, 10, 12, 10, 10, 12, 10, 13];

function setFormule()
{
    valCoef = document.getElementsByClassName("valCoef");

    if (document.getElementById("choixFormule").value == "sci")
        for (i = 0; i < valCoef.length; i++)
            valCoef[i].style.display = "inline";
    else
        for (i = 0; i < valCoef.length; i++)
            valCoef[i].style.display = "none";
}

function setInstall()
{
    divVitesse = document.getElementById("vitesse");

    if(document.getElementById("choixInstall").value == "collec")
        divVitesse.style.display = "inline";
    else
        divVitesse.style.display = "none";

    calculs();
}

function setBaignoire()
{
    capBaign = document.getElementById("capBaign");

    if (document.getElementById("valBaign").value > 0)
    {
        capBaign.style.display = "inline";
        capBaign.lastChild.value = 50;
    }
    else
        capBaign.style.display = "none";

    calculs();
}

function setTemp()
{
    calculs();
}

function choixTemp()
{
    choix = true;
    typeEau = document.getElementById("typeEau");

    if (document.getElementById("choixEau").value == 10)
    {
        typeEau.innerHTML = "EAU FROIDE";
        choix = false;
    }
    else
        typeEau.innerHTML = "EAU CHAUDE";

    return choix;
}

function setRugo()
{
    calculs();
}

function calculNbApp()
{
    nb = 0;
    lesApps = document.getElementsByClassName("nbApp");

    for (i = 0; i < lesApps.length; i++)
        if (lesApps[i].value > -1 && lesApps[i].value != '')
            nb += parseInt(lesApps[i].value);

    return nb;
}


function calculSomCoef(choixEau)
{
    nb = 0;
    lesApps = document.getElementsByClassName("nbApp");

    if (document.getElementById("capBaign").style.display == "inline")
        if (document.getElementById("valCapB").value > 150)
            coef = 3 + ((parseFloat(document.getElementById("valCapB").value) - 150) / 10) * 0.1;
        else
            coef = 3;
    else
        coef = 3;

    if (choixEau == false)
    {
        for (i = 0; i < 7; i++)
            nb += coefTab[i] * parseInt(lesApps[i].value);

        nb += parseInt(lesApps[7].value) * coef;
    }

    else
        nb = parseInt(lesApps[1].value) * coefTab[1] + parseInt(lesApps[2].value) * coefTab[2] + parseInt(lesApps[4].value) * coefTab[4] + parseInt(lesApps[5].value) * coefTab[5] + parseInt(lesApps[7].value) * coef;

    return nb.toFixed(2);
}

function calculCoefSim(choixEau)
{
    lesApps = document.getElementsByClassName("nbApp");
    nbApp = 0;

    if (choixEau == false)
        for (i = 0; i < lesApps.length; i++)
            nbApp += lesApps[i].value != "" ? parseInt(lesApps[i].value) : 0;
    else
    {
        nbApp += lesApps[1].value != "" ? parseInt(lesApps[1].value) : 0;
        nbApp += lesApps[2].value != "" ? parseInt(lesApps[2].value) : 0;
        nbApp += lesApps[4].value != "" ? parseInt(lesApps[4].value) : 0;
        nbApp += lesApps[5].value != "" ? parseInt(lesApps[5].value) : 0;
        nbApp += lesApps[7].value != "" ? parseInt(lesApps[7].value) : 0;
    }

    if (nbApp != 0 && nbApp != 1)
    {
        if (document.getElementById("choixFormule").value == "sci")
            res = (parseFloat(document.getElementById("a").value) + parseFloat(document.getElementById("b").value) / Math.sqrt(nbApp)).toFixed(2);
        else
            res = (0.8 / Math.sqrt(nbApp - 1)).toFixed(2);
    }
    else
        res = 1;

    return res;
}


function calculDebit(choixEau, coefSim)
{
    debitTot = 0;
    lesApps = document.getElementsByClassName("nbApp");

    if (!choixEau)
        for (i = 0; i < 7; i++)
            debitTot += parseInt(lesApps[i].value) * debFroid[i];
    else
        for (i = 0; i < 7; i++)
            debitTot += parseInt(lesApps[i].value) * debChaud[i];

    debitTot = debitTot.toFixed(2);
    debitProb = (debitTot * coefSim).toFixed(2);

    return [debitTot, debitProb];
}


function calculVitesse(diametre, debitProb, somCoef)
{
    diametre = parseFloat(diametre);
    
    if (diametre != 0)
    {
        if (somCoef > 15)
        {
            document.getElementById("vitesse").style.display = "inline";
            document.getElementById("vitesse").value = 1.5;
            vitesse = parseFloat(document.getElementById("vitesse").value);
        }
        else
        {
            document.getElementById("vitesse").style.display = "none";
            vitesse = ((debitProb * 0.001) / (((diametre / 1000)**2) * (3.14159 / 4))).toFixed(2);
        }

        if (vitesse <= 1.5)
        {
            document.getElementById("vitesse").style.display = "inline";
            document.getElementById("vitesse").value = 1.5;
            vitesse = parseFloat(document.getElementById("vitesse").value);
        }
    }
    else
        vitesse = "--";

    return vitesse;
}



function getAppUnique(choixEau)
{
    lesApps = document.getElementsByClassName("nbApp");

    if (!choixEau)
    {
        i = 0;
        while (lesApps[i].value == null || parseInt(lesApps[i].value) == 0)
            i++;
    }
    else
    {
        i = 5;
        while (parseInt(lesApps[i].value) == 0 && i <= 5)
            i++;

        if (i > 5)
            i = 8;
    }

    return i;
}

function correctionDiam(diametre)
{
    lesApps = document.getElementsByClassName("nbApp");

    for (i = 0; i < 7; i++)
        if (parseInt(lesApps[i].value) != 0)
            if (diametre < diaMin[i])
                    diametre = diaMin[i];

    return parseFloat(diametre).toFixed(2);
}

function calculDiam(choixEau, somCoef, debit, nbApp)
{
    somCoef = parseFloat(somCoef);
    debit = parseFloat(debit);
    nbApp = parseInt(nbApp);

    if (document.getElementById("resCoef").innerHTML == null || nbApp == 0)
    {
        diam = "--";
        vitesse = "--";
    }

    else
    {
        if (calculNbApp() == 1)
        {
            iApp = getAppUnique(choixEau);
            diam = diaMin[iApp];
            vitesse = calculVitesse(diam, debit, somCoef);
        }

        else
        {
            if (somCoef < 15 && document.getElementById("installSitu").value == "indiv")
            {
                if (i == somCoef)
                    diam = valDiam[i];
                else
                    diam = valDiam[i + 1] - (valDiam [i + 1] - valDiam[i]) * (i + 1 - somCoef);
                
                diam = correctionDiam(diam);
                vitesse = calculVitesse(diam, debit, somCoef);
            }

            else
            {
                vitesse = calculVitesse(diam, debit, somCoef);
                diam = Math.sqrt((debit * 3600) / (vitesse * 2.8274));
                diam = correctionDiam(diam);
            }
        }
    }

    return [diam, vitesse];
}


function calculLambda(vitesse, diametre, rugo, visco)
{
    vitesse = vitesse == 0 ? 1 : vitesse;
    x1 = 10;
    coef1 = rugo / (3.71 * diametre);
    coef2 = 2.51 / ((vitesse * diametre * 1000) / visco);

    do
    {
        x = x1;
        x1 = x - (x + 2 / Math.log(10) * Math.log(coef1 + coef2 * x)) / (1 + (2 / Math.log(10) * coef2 / (coef1 + coef2 * x)))
    }
    while (Math.abs(x - x1) >= 0.0000001);

    return  1 / (x1**2);
}

function calculDtu(vitesse, diametre)
{
    visco = [1.30, 0.56, 0.38];
    mVol = [1000, 988, 972];
    indexRugo = document.getElementById("choixTuyau").selectedIndex;
    indexTemp = document.getElementById("choixEau").selectedIndex;

    if (diametre == 0 || diametre == "--")
        dtu = "--";
    else
        dtu = mVol[indexTemp] * calculLambda(vitesse, diametre, parseFloat(document.getElementById("choixTuyau").value), visco[indexTemp]) * (vitesse**2 / (2 * diametre / 1000));

    return dtu == "--" ? dtu : (dtu / 9.8039).toFixed(2);
}


function calculs()
{
    choix = choixTemp();
    nbApp = calculNbApp();

    coefSim = calculCoefSim(choix);
    [debitTot, debitSim] = calculDebit(choix, coefSim);
    somCoef = calculSomCoef(choix);
    [diametre, vitesse] = calculDiam(choix, somCoef, debitSim, nbApp);
    dtu = calculDtu(vitesse, diametre);

    document.getElementById("resDebitT").innerHTML = debitTot;
    document.getElementById("resCoef").innerHTML = coefSim;
    document.getElementById("resDebitP").innerHTML = debitSim;
    document.getElementById("resTotCoef").innerHTML = somCoef;
    document.getElementById("resNbApp").innerHTML = nbApp;
    document.getElementById("resPertCh").innerHTML = dtu;
    document.getElementById("resDiaNom").innerHTML = diametre;
    document.getElementById("resVit").innerHTML = vitesse;
}

function initSite()
{   
    setFormule();
    setInstall();
    setBaignoire();

    calculs();
}