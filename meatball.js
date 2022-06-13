class Meatball {
    constructor(ctx, bossPosX, bossPosY, bossHeight) {
        this.ctx = ctx

        this.posX = bossPosX - 150
        this.posY = bossPosY + bossHeight - 100

        this.width = 100
        this.height = 100

        this.velX = -5

    }

    draw() {
        this.ctx.fillStyle = 'brown'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)

        this.move()
    }

    move() {
        this.posX += this.velX
    }

}