class Boss {
    constructor(ctx, Width, Height, posX, posY, framesCounter) {
        this.ctx = ctx

        this.bossSize = {
            width: Width,
            heigth: Height
        }

        this.bossPosition = {
            x: posX,
            y: posY
        }

        this.floorPosY = this.bossPosition.y

        this.meatballs = []
        // this.bossImage = new Image()
        // this.bossImage.src = './resources/images/0.png'

        this.framesCounter = framesCounter

        this.lives = 500
    }

    draw(framesCounter) {

        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.bossPosition.x, this.bossPosition.y, this.bossSize.width, this.bossSize.heigth)

        if (framesCounter % 140 === 0) {
            this.meatballs.push(new Meatball(this.ctx, this.bossPosition.x, this.bossPosition.y, this.bossSize.heigth))
        }


    }

    shoot() {
        // console.log('ESTOY BIEN')
        this.meatballs.forEach(meatball => meatball.draw())
    }
}