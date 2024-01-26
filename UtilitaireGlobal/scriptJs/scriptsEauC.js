let tabVit = [0.1, 0.2, 0.5, 0.8, 1, 1.5, 2, 5, 10];

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