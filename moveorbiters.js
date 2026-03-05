
const middleCard = document.querySelector("middle-card")

let currentDisplayed = null;

document.querySelectorAll("orbit-object").forEach(function(orbiter){
    orbiter.addEventListener("click", function(){
        console.log("gamers")
        if (orbiter == currentDisplayed) {
            unDisplay()
            shrinkCard()
        }
        else {
            display(orbiter)
        }
    })
})



async function display(object) {

    if (currentDisplayed) {
        await unDisplay()
    }
    else {
        growCard()
    }

    //Immediately save position along the path
    object.prevOffsetDistance = window.getComputedStyle(object).getPropertyValue("offset-distance")


    const first = object.getBoundingClientRect()

    object.style.transition = "none"    //kill any running transition

    object.classList.add("displaying")
    object.classList.remove("orbiting")

    const last = object.getBoundingClientRect()

    const offsetx = first.left - last.left
    const offsety = first.top - last.top

    object.style.transform = `translate(${offsetx}px, ${offsety}px)`    //offset it so it looks like it didnt change



//next frame
    requestAnimationFrame(function(){
        object.style.transition = "transform 1s ease"
        object.style.transform = ""
        setTimeout(function(){object.style.transition=""}, 1000)    //restore default transition style after FLIPold
        
    });
    currentDisplayed = object
}

async function unDisplay() {



    const object = currentDisplayed
    currentDisplayed = null;

    const first = object.getBoundingClientRect()

    object.style.transition = "none"
    object.style.visibility = "hidden"   //hide so the teleport isnt visible
    object.style.setProperty("--animation-delay", "-"+(parseFloat(object.prevOffsetDistance)/100)*60+"s")

    object.classList.remove("displaying")
    object.classList.add("orbiting")

    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))   //wait 2 frames, just to be sure. undisplay doesnt work with 1

    const last = object.getBoundingClientRect()

    const offsetx = first.left - last.left
    const offsety = first.top - last.top

    object.style.transform = `translate(${offsetx}px, ${offsety}px)`    //offset it so it looks like it didnt change
    object.style.visibility = ""         // show it — it's visually back at first position

    requestAnimationFrame(function(){
        object.style.transition = "transform 1s ease"
        object.style.transform = ""
        setTimeout(function(){object.style.transition=""}, 1000)    //restore default transition style after FLIP
    });
}

function growCard(){
    middleCard.style.height = "0.5vh"
    middleCard.style.width = "0px"

middleCard.getBoundingClientRect()

    middleCard.style.transition = "width 0.5s, height 0.5s"

    middleCard.getBoundingClientRect()  // force reflow — commits the transition style before width changes

    middleCard.style.width = 35*(4/3)+"vh"

    setTimeout(function(){
        middleCard.style.height = "35vh"
    }, 500)
    setTimeout(function(){
        middleCard.style.transition = ""
    }, 1000)
}

function shrinkCard(){
    middleCard.style.transition = "width 0.5s, height 0.5s"
    middleCard.getBoundingClientRect()

    middleCard.style.height = "0.5vh"
    setTimeout(function(){
        middleCard.style.width = "0px"
    }, 500)

    setTimeout(function(){
        middleCard.style = ""
    }, 1000)
}