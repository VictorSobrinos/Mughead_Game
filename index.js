// // ÚLTIMAS ADICIONES 

window.onload = () => {
    let background = document.querySelector(".background")
    let canvasTag = document.querySelector("#canvas")
    
    // let diffNormal = document.querySelector(".normal")
    // let diffHard = document.querySelector(".hard")

    let boolVal = false
    // let diffBool = false

    // ÚLTIMOS CAMBIOS
    // diffNormal.addEventListener("onclick", function() {
    //     diffBool = true
    //     App.init()
    // })

    // diffHard.addEventListener("onclick", function() {
    //     diffBool = false
    //     App.init()
    // })

    document.addEventListener("keypress", function () {
        if (!boolVal) {
            // canvasTag.classList.toggle("nonDisplay")

            background.classList.toggle("nonDisplay")
            canvasTag.classList.toggle("nonDisplay")

            // difficulty.classList.toggle("nonDisplay")
            App.init()
        }
        boolVal = true
    })
}
