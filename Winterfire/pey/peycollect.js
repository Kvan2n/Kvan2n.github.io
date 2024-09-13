if (localStorage.getItem("Peycollect") == "true") {
    document.getElementById("pey").style.display = "none"
    document.getElementById("congrats").innerHTML = "You have already collected the pey, but what does it do?"
}

function collect(){
    localStorage.setItem("Peycollect", "true")
    document.getElementById("pey").style.display = "none"
}