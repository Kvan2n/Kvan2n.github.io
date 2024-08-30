function changenumbers () {
    random = Math.random()*10000000000000000+1000000000000000
    
    random = Math.round(random)

    randomnum = random

    random = "Current Seawater Prices: " + String(random) + " Złoty"

    document.getElementById("numberspam").innerHTML = random
    setTimeout(changenumbers, 200)
}

changenumbers()



function buy() {
    console.log(":)")
    document.getElementById("buybutton").style.display = "block"
    document.getElementById("foramount").innerHTML = "for "  + String(randomnum) + " Złoty"
    document.getElementById("foramount").style.display = "block"

    setTimeout(function(){
        document.getElementById("buybutton").style.display = "none"
        document.getElementById("foramount").style.display = "none"

    }, 2000)

}