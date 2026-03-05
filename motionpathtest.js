gsap.registerPlugin(MotionPathPlugin, Flip);    //register plugins

const orbitContainer = document.querySelector("orbit-container")
const middleCard = document.querySelector("middle-card")

let currentDisplayed = null     //nothing is displayed to begin with

ORBITTIME = 60  //time for one orbit



// START CODE

MotionPathPlugin.convertToPath("ellipse",true)  //convert all ellipse tags to path tags

//gsap.set(middleCard, { scaleX: 0, scaleY: 0 })  //make middlecard infinitely tiny


//make the orbiters
const orbiters = [
    makeOrbiter("img/anton.png", true),
    makeOrbiter("img/anton.png", true),
]


let tweens = applyOrbiters(orbiters)    //apply orbiters, see the function for info


// recalculate tweens whenever orbitContainer is resized
new ResizeObserver(function(){
    tweens.forEach(function(tween){
        tween.invalidate()
    })
}).observe(orbitContainer)




// FUNCTIONS

// Create an orbit-object
function makeOrbiter(imagePath, hideoverflow) {
    const orbiter = document.createElement("orbit-object")  //make the element
    if (hideoverflow){orbiter.classList.add("hideoverflow")}    //allow for images passing through the circle borders
    const img = document.createElement("img")   //make the image
    img.src = imagePath     //image path
    img.draggable = false   //disable the annoying drag thing

    orbiter.appendChild(img)        //add image to orbiter
    orbitContainer.appendChild(orbiter) //add orbiter to container

    return orbiter  //return the orbiter for the array
}

// Make a tween for the selected orbiter
function makeTween (orbiter, startTime) {
    const tween = gsap.to(orbiter, {
        duration: ORBITTIME,    //time for one loop
        repeat: -1,     //repeat endlessly
        ease: "none",
        motionPath: {
            path: "#orbitPath",     
            align: "#orbitPath",
            alignOrigin: [0.5, 0.5],
            autoRotate: false   //dont follow the path rotation
        }
    }).seek(startTime)//start at the specified starttime

    return tween
}

// add orbiters to the container
function applyOrbiters(orbiters) {
    let tweens = []
    orbiters.forEach(function(orbiter, index){      //Loop through orbiters list
        orbitContainer.appendChild(orbiter) //add orbiter to container
        const tween = makeTween(orbiter, index*(ORBITTIME/(orbiters.length)))   //make a tween for the orbiter at proper start time so theyre all evenly spaced
        tweens.push(tween)  //add the tween to the tweens array

        //pause when hovering
        orbiter.addEventListener("mouseover", function(){
            tween.pause()
        })

        //continue loop when stop hovering IF its currently orbiting
        orbiter.addEventListener("mouseout", function(){
            if (orbiter != currentDisplayed){
                tween.resume()
            }
        })

        //display or undisplay it on click
        orbiter.addEventListener("click", function(){
            if (currentDisplayed == orbiter) {
                unDisplay()
            } else {
                display(orbiter)
            }
            
        })



    })

    return tweens
}

function display (orbiter){
    const state = Flip.getState(orbiter, {simple:true})    //save state for FLIP
    middleCard.append(orbiter)  //move it to middlecard

    gsap.getTweensOf(orbiter)[0].pause()    //pause the orbit tween
    orbiter.prevStyle = orbiter.style.cssText   //backup the style
    orbiter.style = ""      //get rid of styling
    orbiter.tweenTime = gsap.getTweensOf(orbiter)[0].time() //save the tweentime for undisplaying

    //flip animate it
    Flip.from(state, {
        duration:1,
    })

    //animate the middlecard opening
    if (currentDisplayed) {

    }
    else {
        //
        gsap.to(middleCard, {
            duration:0,
            height:"35vh",
            
        })

        currentDisplayed = orbiter


    }
}

function unDisplay (){
    const orbiter = currentDisplayed
    currentDisplayed = null
    const tween = gsap.getTweensOf(orbiter)[0]

    const state = Flip.getState(orbiter)
    orbitContainer.append(orbiter)
    orbiter.style = orbiter.prevStyle
    Flip.from(state, {
        duration:1,
        onComplete:function(){
            tween.resume()
            tween.seek(orbiter.tweenTime)
        }
    })
}