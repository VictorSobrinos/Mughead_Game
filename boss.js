class Boss {

    constructor(ctx, Width, Height, posX, posY, framesCounter, hits, meatVel) {
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

        this.meatVel = meatVel
    }

    draw(framesCounter) {

        this.bossImg = new Image()
        // this.bossImg.src = "./resources/boss.png"
        this.bossImg.src = "./resources/mrpotato.png"


        this.ctx.drawImage(this.bossImg, this.position.x, this.position.y, this.size.width, this.size.heigth)

        if (framesCounter % this.difficulty === 0) {
            this.meatballs.push(new Meatball(this.ctx, this.position.x, this.position.y, this.size.heigth, this.meatVel))

        }


    }

    shoot() {

        this.meatballs.forEach(meatball => meatball.draw())

    }
}