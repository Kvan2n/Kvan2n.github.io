gsap.registerPlugin(MotionPathPlugin);

const orbitContainer = document.querySelector("orbit-container")

ORBITTIME = 60



MotionPathPlugin.convertToPath("ellipse",true)



const orbiters = [
    makeOrbiter("img/anton.png", true),
    makeOrbiter("img/anton.png", true),
]


let tweens = applyOrbiters(orbiters)



new ResizeObserver(function(){
    tweens.forEach(function(tween){
        tween.invalidate()
    })
}).observe(orbitContainer)






function makeOrbiter(imagePath, hideoverflow) {
    const orbiter = document.createElement("orbit-object")
    if (hideoverflow){orbiter.classList.add("hideoverflow")}
    const img = document.createElement("img")
    img.src = imagePath
    img.draggable = false

    orbiter.appendChild(img)
    orbitContainer.appendChild(orbiter)

    return orbiter
}

function makeTween (orbiter, startTime) {
    console.log(startTime)
    const tween = gsap.to(orbiter, {
        duration: ORBITTIME,
        repeat: -1,
        ease: "none",
        motionPath: {
            path: "#orbitPath",
            align: "#orbitPath",
            alignOrigin: [0.5, 0.5],
            autoRotate: false
        }
    }).seek(startTime)

    return tween
}

function applyOrbiters(orbiters) {
    let tweens = []
    orbiters.forEach(function(orbiter, index){
        orbitContainer.appendChild(orbiter)
        const tween = makeTween(orbiter, index*(ORBITTIME/(tweens.length+1)))
        tweens.push(tween)

        orbiter.addEventListener("mouseover", function(){
            tween.pause()
        })
        orbiter.addEventListener("mouseout", function(){
            tween.resume()
        })


    })

    return tweens
}