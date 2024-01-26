function calculVanne()
{
    hauteur = document.getElementById("valHaut").value;
    debit = document.getElementById("valDebit").value;
    coefRes = document.getElementById("coefRes");

    kv = Math.sqrt((debit**2 * 0.1) / hauteur).toFixed(2);

    coefRes.innerHTML = kv;
}