class Player {

    constructor(ctx, Width, Height, posX, posY, bossPosition, floor, hits, cooldown) {

        this.ctx = ctx

        this.leftCheck = false
        this.rightCheck = false

        this.size = {

            width: Width,
            height: Height
        }

        this.pos = {

            x: posX,
            y: posY
        }

        // Game control keys 
        this.keys = {

            SPACE: 32,
            LEFT: 37,
            RIGHT: 39,
            SHOOT: 69
        },

            this.floorPosY = floor

        this.bullets = []

        this.velY = 1

        this.grav = 0.4

        this.bossPosition = bossPosition

        this.hits = hits

        this.cdtime = cooldown

        this.cd = this.cdtime

        this.jumpBool = false

        this.playerImg = new Image()

        this.playerImg.src = "./resources/mainPlayer.png";

        this.framesIndex = 0;

        this.shootAudio = new Audio("./resources/shoot_sound.mp3")
    }

    animate(framesCounter) {

        this.playerImg = new Image()

        this.playerImg.src = "./resources/jumpAnimation.png";
        this.playerImg.frames = 8;

        if (framesCounter % 5 === 0) {
            this.framesIndex++;

        }

        if (this.framesIndex >= this.playerImg.frames) {
            this.framesIndex = 0;
        }

        this.ctx.drawImage(
            this.playerImg,
            this.framesIndex * (this.playerImg.width / this.playerImg.frames), //Para movernos de frame de la misma playerImgn
            0,
            this.playerImg.width / this.playerImg.frames,
            this.playerImg.height,
            this.pos.x,
            this.pos.y,
            this.size.width,
            this.size.height
        )


    }

    draw() {

        if (this.cd < this.cdtime) {
            this.cd++
        }

        this.ctx.drawImage(this.playerImg, this.pos.x, this.pos.y, this.size.width, this.size.height)

        this.gravity()

        if (this.pos.y === this.floorPosY) {
            this.jumpBool = false
            this.playerImg.src = "./resources/mainPlayer.png"
        }

    }

    setEventListeners() {

        document.addEventListener('keydown', e => {

            switch (e.keyCode) {

                case this.keys.SPACE:
                    this.jump()
                    break;

                case this.keys.LEFT:
                    this.leftCheck = true
                    break;

                case this.keys.RIGHT:
                    this.rightCheck = true
                    break;

                case this.keys.SHOOT:
                    if (this.cd === this.cdtime) {
                        this.bullets.push(new Bullet(this.ctx, this.pos.x, this.pos.y, this.size.height, this.size.width))
                        this.shootAudio.play()
                        this.cd = 0
                        this.shoot()
                    }
            }

        })

        document.addEventListener('keyup', e => {

            switch (e.keyCode) {

                case this.keys.SPACE:
                    this.jump()
                    break;

                case this.keys.LEFT:
                    this.leftCheck = false
                    break;

                case this.keys.RIGHT:
                    this.rightCheck = false
                    break;
            }

        })

    }

    moveLeft() {

        if (this.pos.x > 0) {
            this.pos.x -= 6

        }
    }

    moveRight() {

        if (this.pos.x < this.bossPosition - this.size.width - 10) this.pos.x += 6
    }

    jump() {

        this.jumpBool = true

        if (this.pos.y === this.floorPosY) {
            this.pos.y -= 20
            this.velY = -12
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

}