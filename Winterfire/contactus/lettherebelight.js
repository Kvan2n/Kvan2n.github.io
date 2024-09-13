if (localStorage.getItem("Peycollect") == "true") {
    document.getElementById("body").style.background = "white"
    document.getElementById("pey").style.display = "block"
}

function use () {
    document.getElementById("pey").remove()
    //document.getElementById("p-keyhole").remove()
    document.getElementById("chatbutton").style.display = "block"
    document.getElementById("heading1").innerHTML = "Contact us"
    localStorage.setItem("Peycollect", "false")
}

function chat () {
    window.location.href = "chat.html"
}