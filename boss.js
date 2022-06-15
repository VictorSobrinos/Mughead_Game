class Boss {

    constructor(ctx, Width, Height, posX, posY, framesCounter, hits) {
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

        this.framesCounter = framesCounter

        this.hits = hits

        this.difficulty = 110
    }

    draw(framesCounter) {

        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.heigth)

        if (framesCounter % this.difficulty === 0) {
            this.meatballs.push(new Meatball(this.ctx, this.position.x, this.position.y, this.size.heigth))

        }


    }

    shoot() {

        this.meatballs.forEach(meatball => meatball.draw())
    }
}