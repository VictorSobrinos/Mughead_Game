class Boss {
    constructor(ctx, Width, Height, posX, posY, framesCounter, lives) {
        this.ctx = ctx

        this.size = {
            width: Width,
            heigth: Height
        }

        this.position = {
            x: posX,
            y: posY
        }

        this.floorPosY = this.position.y

        this.meatballs = []
        // this.bossImage = new Image()
        // this.bossImage.src = './resources/images/0.png'

        this.framesCounter = framesCounter

        this.lives = lives

        this.difficulty = 120
    }

    draw(framesCounter) {

        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.heigth)

        if (framesCounter % this.difficulty === 0) {
            this.meatballs.push(new Meatball(this.ctx, this.position.x, this.position.y, this.size.heigth))

        }


    }

    shoot() {
        // console.log('ESTOY BIEN')
        this.meatballs.forEach(meatball => meatball.draw())
    }
}