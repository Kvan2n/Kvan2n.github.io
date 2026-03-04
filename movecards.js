const orbitContainer = document.querySelector("orbit-container")
const middleCard = document.querySelector("middle-card")


const orbiters = document.querySelectorAll("orbit-object")

let currentDisplayed = null

orbiters.forEach(function(orbiter){
    orbiter.addEventListener("click", function(){

        if (currentDisplayed == orbiter) {
            unDisplay(false)
        }
        else {
            display(orbiter)
        }
        
        
    })
});

function FLIP (object, newParent, quickFix) {
    const first = object.getBoundingClientRect()   //save pos from before moving

    object.style.transition = "none"               // kill any running transition first
    if (quickFix) {
        //DO NOT question the quickfix
        //when undisplaying it teleports 14vh up and moves from there
        //so just move it down first ¯\_(ツ)_/¯
        object.style.transform = "translate(0vh, -14vh)"
    }
    else {
        object.style.transform = ""

    }

    newParent.append(object)
    const last = object.getBoundingClientRect()    //save pos after moving

    currentDisplayed = object

    const offsetx = first.left - last.left
    const offsety = first.top - last.top


    object.style.transform = `translate(${offsetx}px, ${offsety}px)`
    object.getBoundingClientRect()                 // force reflow — ensures transform is committed before rAF

    requestAnimationFrame(function(){
        object.style.transition = "transform 1s ease"
        object.style.transform = ""
        setTimeout(function(){object.style.transition=""}, 1000)    //restore default transition style after FLIP
        
    });
}

function display (object){
    if (currentDisplayed == null) {

        middleCard.style.transition = "none"
        middleCard.style.height = "35vh"

        middleCard.getBoundingClientRect()

        //TODO: offset the final position and snap back after that, maybe have to animate that as well

        FLIP(object, middleCard)

        
        middleCard.style.aspectRatio = "unset"  //disable the aspect ratio
        middleCard.style.height = "0.5vh"   //a little height so you see the line expand
        middleCard.style.width = "0px"  //pin current width explicitly
        middleCard.getBoundingClientRect()  // force reflow so browser commits starting state


        middleCard.style.transition = "height 0.5s ease, width 0.5s ease"   //enable transitions

        middleCard.style.width = 35*(4/3)+"vh"  //transition the width to its width at correct aspect ratio (4/3)

        setTimeout(function(){middleCard.style.height = "35vh"}, 500)   //when width is done, transition height

        setTimeout(function(){  //clean up when done
            middleCard.style.aspectRatio = ""
            middleCard.style.width = ""
            middleCard.style.transition = ""
        },1000)
    }
    else {
        unDisplay(true)
        FLIP(object, middleCard)
    }
    





    currentDisplayed = object
}

function unDisplay (keep){
    FLIP(currentDisplayed, orbitContainer, true)

    currentDisplayed = null

    if (!keep){middleCard.style.height = "0px"};
}