class Player {
    constructor(ctx, Width, Height, posX, posY, keys, bossPosition, floor,lives) {
        this.ctx = ctx

        this.size = {
            width: Width,
            height: Height
        }

        this.pos = {
            x: posX,
            y: posY
        }
        this.keys = keys

        this.floorPosY = floor

        this.bullets = []

        this.playerImage = new Image()
        this.playerImage.src = './resources/images/0.png'
        // this.image.framesIndex = 0
        // this.imageFramesNumber = 0

        this.velY = 1

        this.grav = 0.4

        this.bossPosition = bossPosition

        this.lives = lives
    }

    draw() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
        this.gravity()

    }

    setEventListeners() {

        document.addEventListener('keydown', e => {

            switch (e.keyCode) {
                case this.keys.SPACE:
                    this.jump()
                    break;

                case this.keys.LEFT:
                    this.moveLeft()
                    break;

                case this.keys.RIGHT:
                    this.moveRight()
                    break;

                case this.keys.SHOOT:
                    this.bullets.push(new Bullet(this.ctx, this.pos.x, this.pos.y, this.size.height, this.size.width))
                    this.shoot()
                    console.log('shoot')

            }

        })

    }

    moveLeft() {
        if (this.pos.x > 0) {
            this.pos.x -= 20

        }
    }

    moveRight() {
        console.log(this.bossPosition)
        if (this.pos.x < this.bossPosition - this.size.width - 10)
            this.pos.x += 20

    }


    jump() {
        if (this.pos.y === this.floorPosY) {
            this.pos.y -= 120
            this.velY -= 8
        }
    }

    gravity() {
        if (this.pos.y < this.floorPosY) {
            this.pos.y += this.velY
            this.velY += this.grav
        }
        else {
            this.pos.y = this.floorPosY;
            this.velY = 1
        }
    }

    shoot() {
        this.bullets.forEach(bullet => bullet.draw())
    }

    // clearBullets() {
    //      this.bullets = this.bullets.filter(bullet => bullet.posX <= this.boss.posX)
    // }

}