mps = 0
money = 0
upgradeprice = 0
multiplier = 1
addedmultiplier = 0

moneylabel = document.getElementById("money")
productionlabel = document.getElementById("production")
upgradepricelabel = document.getElementById("producerupgradeprice")
multiplierlabel = document.getElementById("multiplier")
addedmultiplierlabel = document.getElementById("addedmultiplier")


function tick () {
    money += (mps * multiplier);
    addedmultiplier = (mps/100)

    moneylabel.innerText = (Math.round(money*10)/10).toString()
    addedmultiplierlabel.innerText = (Math.round(addedmultiplier*10)/10).toString()
}


function upgrade () {
    
    if (upgradeprice==0) {
        mps = 0.1
        upgradeprice =1
        
    }
    else if (money >= upgradeprice) {
        money -= upgradeprice
        mps *=2
        upgradeprice *= 1.9
    }
    productionlabel.innerText = (Math.round(mps*10)/10).toString();
    upgradepricelabel.innerText = (Math.round(upgradeprice*10)/10).toString();
}

function rebirth () {
    mps = 0
    money = 0
    upgradeprice = 0
    

    multiplier += addedmultiplier
    productionlabel.innerText = (Math.round(mps*10)/10).toString();
    upgradepricelabel.innerText = (Math.round(upgradeprice*10)/10).toString();
    multiplierlabel.innerText = (Math.round(multiplier*1000)/1000).toString();
    addedmultiplier = 0
}

setInterval(tick, 1000)