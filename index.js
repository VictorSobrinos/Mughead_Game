// // ÚLTIMAS ADICIONES 

window.onload = () => {
    let difficulty = document.querySelector(".difficulty")
    let canvasTag = document.querySelector("#canvas")

    let boolVal = false

    document.addEventListener("keypress", function () {
        if (!boolVal) {

            canvasTag.classList.toggle("nonDisplay")
            difficulty.classList.toggle("nonDisplay")

            // difficulty.classList.toggle("nonDisplay")
            App.menu()
        }
        boolVal = true
    })
}
