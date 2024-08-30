
function makerandom() {
    random = Math.random()*9
    random = Math.round(random)
    document.getElementById("numberheading").innerHTML = random
    setTimeout(makerandom, 200)
}

makerandom()

function closecookies() {
    document.getElementById("cookieask").style.display = "none";
}

function viewdata() {
    personaldata = document.getElementById("datainput").value
    document.getElementById("datadisplay").innerHTML = personaldata
}