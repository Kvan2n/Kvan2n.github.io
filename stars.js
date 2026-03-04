let starCount = 0

for (let i = 0; i < 90; i++) {
    const star = document.createElement("background-star")
    star.style.left = Math.random() * 100+"%"
    star.style.top = Math.random() * 100+"%"
    document.body.appendChild(star)

}