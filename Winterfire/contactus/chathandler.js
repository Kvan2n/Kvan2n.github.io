function gettools () {
    window.location.replace("/Winterfire/getstarted/start.html")
}

function problem () {
    document.getElementById("div2").style.display = "block"
}



function checkcode () {
    code = document.getElementById("whatisproblem").value
    if (code == "slow") {
        clearInterval(codechecker)
        document.getElementById("div3").style.display = "block"
    }
}

codechecker = setInterval(checkcode, 400)

function reportstart () {
    document.getElementById("div4").style.display = "block"
}

function checkerror () {
    errorcode = document.getElementById("whatiserror").value
    if (String(errorcode) == "E166") {
        clearInterval(errorchecker)
        document.getElementById("div5").style.display = "block"
        localStorage.setItem("errorreported","true")
    }

}

errorchecker = setInterval(checkerror, 400)