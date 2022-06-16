class Meatball {

    constructor(ctx, bossPosX, bossPosY, bossHeight, velX) {
        this.ctx = ctx

        this.posX = bossPosX - 150
        this.posY = bossPosY + bossHeight - 100

        this.width = 100
        this.height = 100

        this.velX = velX

        this.meatBalltImg = new Image()
        this.meatBalltImg.src = "./resources/meat.png"
        this.framesIndex = 0
    }

    draw() {

        this.ctx.drawImage(this.meatBalltImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX += this.velX
    }
}