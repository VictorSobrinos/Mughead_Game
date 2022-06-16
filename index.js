// // ÚLTIMAS ADICIONES 

window.onload = () => {
    let difficulty = document.querySelector(".difficulty")
    let background = document.querySelector(".background")


    let boolVal = false

    document.addEventListener("keypress", function () {
        if (!boolVal) {

            background.classList.toggle("nonDisplay")
            difficulty.classList.toggle("nonDisplay")

            App.menu()
        }
        boolVal = true
    })
}
