for (i = 1; i < 7; i+=1) {
    num1 = Math.random()*70
    num2 = Math.random()*70
    num3 = Math.random()*40+10


    document.getElementById(String(i)).style.top = String(num1) + "%"
    document.getElementById(String(i)).style.left = String(num2) + "%"
    document.getElementById(String(i)).style.width = String(num3) +"%"


}

function thanks () {
    document.getElementById("thanks").style.display = "block"
}

if (localStorage.getItem("errorreported") == "true") {

    document.getElementById("thanks").innerHTML = "Thank you for reporting an error in Winterflux Gamingtools, your support means everything to us"
    document.getElementById("downloader").href = "Congrats.jpg"
}