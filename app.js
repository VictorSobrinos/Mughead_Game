const App = {
    name: 'MUGHEAD',
    author: 'Daniel/Víctor',
    version: '1.0.0',
    license: undefined,
    description: 'Best Game in Town',
    appWidth: undefined,
    appHeight: undefined,

    // CANVAS SIZE 
    counter: 0,
    canvasSize: {
        w: undefined,
        h: undefined
    },

    ctx: undefined,
    FPS: 120,
    framesCounter: 0,

    background: undefined,
    player: undefined,
    boss: undefined,
    floor: undefined,
    newArr: [],
    shiftedArr: [],


    keys: {
        TOP: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        SHOOT: 69
    },

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.appWidth = window.innerWidth
        this.appHeight = window.innerHeight

        this.canvasSize.w = this.appWidth
        this.canvasSize.h = this.appHeight

        this.floor = this.canvasSize.h - 150


        document.querySelector('#canvas').setAttribute('width', this.appWidth)
        document.querySelector('#canvas').setAttribute('height', this.appHeight)
    },


    start() {
        this.createAll()
        this.player.setEventListeners()


        this.interval = setInterval(() => {

            // MOVIMIENTO -> KEYDOWN: BOOLEANOS PARA NO CHEQUAR EL MOVIMIENTO CADA VEZ
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.clear()

            this.player.draw()
            this.player.shoot()
            this.boss.draw(this.framesCounter)
            this.boss.shoot()
            this.isCollision()
            this.clearMeatballs()
            console.log(this.boss.meatballs)

        }, 1000 / this.FPS)

    },

    createAll() {
        // this.background = new Background
        this.boss = new Boss(this.ctx, 200, 400, this.canvasSize.w - 300, this.floor - 300, this.framesCounter)
        this.player = new Player(this.ctx, 50, 100, 100, this.floor, this.keys, this.boss.bossPosition.x, this.floor, 0)
    },



    clear() {
        this.ctx.clearRect(0, 0, this.appWidth, this.appHeight)
    },

    //------------------------------------------------------------------------------------------
    //IF BULLET POSITION === BOSS POSITION ----> LVES - 1

    gameOver() {
        // console.log('GAME OVER')
        clearInterval(this.interval)
        this.clear()
        this.player.lives = 0

        this.shiftedArr = []


        setTimeout(() => {
            this.start()
        }, 2000)

    },

    isCollision() {

        this.boss.meatballs.forEach(meatball => {
            if ((this.player.pos.x + this.player.size.width >= meatball.posX + 20 && this.player.pos.x < meatball.posX + meatball.width) && (this.player.pos.y + this.player.size.height >= meatball.posY + 20)) {
                this.shiftedArr.push(this.boss.meatballs.shift())

                this.player.lives = this.shiftedArr.length
                if (this.player.lives === 3) {
                    // prompt('YOU MAD BRO!')

                }

            }
        })

        if (this.player.lives === 3) {
            this.gameOver()
        }
    },

    clearMeatballs() {
        this.boss.meatballs = this.boss.meatballs.filter(meatball => meatball.posX >= 0)
    }

    // IF BOSS LIVES === 0 -> YOU WIN
    // youWin() {
    // console.prompt('CONGRATULATIONS, YOU WON!!
    // }

}

