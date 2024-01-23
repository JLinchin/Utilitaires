let tabDebit = [50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];

function lambda(debit, diametre)
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


function calcul()
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

        pdc = lambda(debit, diametre) * 6.37 * 1000 * 9.81;
        perteCharge = (pdc / diametre**5 * debit**2);

        diamOpti.innerHTML = diametre.toFixed(2);
        vitOpti.innerHTML = vitesse.toFixed(2);
        pertOpti.innerHTML = perteCharge.toFixed(2);


        divDebit = document.createElement("div");
        divDebit.className = "childGrid";
        divDebit.innerHTML = "Débit en l/h";
        
        divDia = document.createElement("div");
        divDia.className = "childGrid";
        divDia.innerHTML = "Diamètre en mm";

        divVit = document.createElement("div");
        divVit.className = "childGrid";
        divVit.innerHTML = "Vitesse en m/s";

        divPdC = document.createElement("div");
        divPdC.className = "childGrid";
        divPdC.innerHTML = "PdC en Pa/mm";

        tableRes.append(divDebit);
        tableRes.append(divDia);
        tableRes.append(divVit);
        tableRes.append(divPdC);

        //Calcul des valeurs du tableau
        for (i = 0; i < tabDebit.length; i++)
        {
            tuyauA = (25 * vitL - 4 * vitT) / 21;
            tuyauB = (vitT - vitL) / 21;;
            vitesse = (tuyauA + tuyauB * (Math.log(tabDebit[i]) / 2.3026)**2);

            diametre = (Math.sqrt(4 / (Math.PI * 3.6) * tabDebit[i] / vitesse));

            pdc = lambda(tabDebit[i], diametre) * 6.37 * 1000 * 9.81;
            perteCharge = (pdc / diametre**5 * tabDebit[i]**2);

            divDebit = document.createElement("div");
            divDebit.className = "childGrid";
            divDebit.innerHTML = tabDebit[i];
            
            divDia = document.createElement("div");
            divDia.className = "childGrid";
            divDia.innerHTML = diametre.toFixed(2);

            divVit = document.createElement("div");
            divVit.className = "childGrid";
            divVit.innerHTML = vitesse.toFixed(2);

            divPdC = document.createElement("div");
            divPdC.className = "childGrid";
            divPdC.innerHTML = perteCharge.toFixed(2);

            tableRes.append(divDebit);
            tableRes.append(divDia);
            tableRes.append(divVit);
            tableRes.append(divPdC);
        }
    }
}