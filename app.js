const App = {

    // LICENSE
    name: 'MUGHEAD',
    author: 'Daniel/Víctor',
    version: '1.0.0',
    license: undefined,
    description: 'Best Game in Town',
    appWidth: undefined,
    appHeight: undefined,

    // CANVAS SIZE 
    canvasSize: {
        w: undefined,
        h: undefined
    },

    ctx: undefined,

    FPS: 120,
    framesCounter: 0,

    player: undefined,
    boss: undefined,
    floor: undefined,

    shiftedMeatballs: [],
    shiftedBullets: [],

    // "hitCondition" specifies the boss hitbox limit
    hitCondition: 0,

    bossHits: 0,

    // Game control keys 
    keys: {
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

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.clear()

            this.player.draw()
            this.player.shoot()

            // Boolean values linked with key events to improve movement mechanics.
            // Key events are being checked every interval this way:
            if (this.player.leftCheck) {
                this.player.moveLeft()
            }

            if (this.player.rightCheck) {
                this.player.moveRight()
            }

            this.boss.draw(this.framesCounter)
            this.boss.shoot()
            this.isCollision()
            this.clearMeatballs()
            this.clearBullets()

        }, 1000 / this.FPS)
    },

    // VUELVE AQUÍ!!!
    createAll() {

        this.boss = new Boss(this.ctx, 200, 400, this.canvasSize.w - 300, this.floor - 300, this.framesCounter, 50)
        this.player = new Player(this.ctx, 50, 100, 100, this.floor, this.keys, this.boss.position.x, this.floor, 0)
    },



    clear() {

        this.ctx.clearRect(0, 0, this.appWidth, this.appHeight)
    },

    isCollision() {

        this.boss.meatballs.forEach(meatball => {
            if ((this.player.pos.x + this.player.size.width >= meatball.posX + 25 //+25 to improve hitbox limits
                && this.player.pos.x < meatball.posX + meatball.width)
                && (this.player.pos.y + this.player.size.height >= meatball.posY + 20)) { //+20 to improve hitbox limits

                this.shiftedMeatballs.push(this.boss.meatballs.shift())

                this.player.lives = this.shiftedMeatballs.length
                if (this.player.lives === 3) {

                }

            }
        })
        console.log(this.bossHits)
        // BULLETS
        this.player.bullets.forEach(bullet => {
            if (bullet.posX + bullet.width >= this.boss.position.x && this.hitCondition === 0) {
                this.hitCondition++
                this.bossHits++
            }
            else {
                this.hitCondition = 0
            }

        })
        if (this.bossHits >= this.boss.lives) {
            this.youWin()
        }

        if (this.player.lives === 3) {
            this.gameOver()
        }
    },

    clearMeatballs() {

        this.boss.meatballs = this.boss.meatballs.filter(meatball => meatball.posX >= 0)
    },

    clearBullets() {

        this.player.bullets = this.player.bullets.filter(bullet => bullet.posX < this.boss.position.x)
    },

    gameOver() {

        clearInterval(this.interval)

        this.clear()
        this.ctx.font = "30px Arial"
        this.ctx.fillText("YOU LOST! :(", this.canvasSize.w / 2 - 200, this.canvasSize.h / 2)
        this.player.lives = 0

        this.bossHits = 0
        this.shiftedMeatballs = []
        this.player.cdtime = 0

        setTimeout(() => {
            this.start()
        }, 3000)

    },

    youWin() {

        clearInterval(this.interval)
        this.clear()
        this.player.cdtime = 0
        this.ctx.font = "30px Arial"
        this.ctx.fillText("YOU WON :) GET A LIFE, THO", this.canvasSize.w / 2 - 200, this.canvasSize.h / 2)
        this.player.bullets = []
        this.player.lives = 0
        this.bossHits = 0

        setTimeout(() => {
            this.start()
        }, 3000)
    }

}

