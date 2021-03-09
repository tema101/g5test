let found = 0
let button, buttonText, centerX, centerY, overlay, scene, dogs, dog, width, height, orientation

class Scene extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.setBaseURL('/')
    this.load.image('scene', 'assets/scene.jpg')
    this.load.image('btn', 'assets/btn.png')
    this.load.image('char', 'assets/char.png')
    this.load.image('circle1', 'assets/circle_1.png')
    this.load.image('circle2', 'assets/circle_2.png')
    this.load.image('circle3', 'assets/circle_3.png')
    this.load.image('circle4', 'assets/circle_4.png')
    this.load.image('circle5', 'assets/circle_5.png')
    this.load.image('circle6', 'assets/circle_6.png')
    this.load.image('circle7', 'assets/circle_7.png')
    this.load.image('circle8', 'assets/circle_8.png')
    this.load.image('circle9', 'assets/circle_9.png')
    this.load.image('doggy', 'assets/doggy.png')
    this.load.image('logo', 'assets/logo.png')
    this.load.image('sparkle', 'assets/sparkle.png')
  }

  create() {
    width = this.sys.canvas.width
    height = this.sys.canvas.height
    centerX = this.sys.canvas.width / 2
    centerY = this.sys.canvas.height / 2

    scene = this.add.image(centerX, centerY, 'scene')

    dogs = this.add.group()
    dogs.create(centerX - 310, centerY + 230, 'doggy')
    dogs.create(centerX - 370, centerY - 120, 'doggy').setScale(.8).setFlipX(true)
    dogs.create(centerX - 5, centerY - 55, 'doggy').setScale(.7).setFlipX(true)
    dogs.create(centerX + 410, centerY - 120, 'doggy').setScale(.6)
    dogs.create(centerX + 430, centerY + 220, 'doggy').setScale(.75)

    overlay = this.add.renderTexture(0, 0, width, height).fill(0x000000, 1).setDepth(1)
    overlay.setAlpha(.9)

    const introTextStyle = { color: '#fff', fontFamily: 'sans-serif', fontSize: 48 }
    const introDog = this.add.image(centerX + 180, centerY - 20, 'doggy').setFlipX(true).setOrigin(.5).setDepth(3)
    const introText = this.add.text(centerX, centerY, '5 Hidden Dogs', introTextStyle).setOrigin(.6, .5).setDepth(3)
    const introSubText = this.add.text(centerX, centerY + 80, 'Can you spot them?', introTextStyle).setOrigin(0.5).setDepth(3)

    this.tweens.add({
      targets: [overlay, introText, introSubText, introDog],
      alpha: 0,
      duration: 500,
      delay: 1000,
      ease: 'Linear',
      repeat: 0,
      yoyo: false
    }).on('complete', () => {
      dogs.getChildren().forEach(dog => {
        dog.setInteractive().on('clicked', this.clickHandler, this)

        found++
      })
    })

    this.input.on('gameobjectup', function (pointer, gameObject) {
      gameObject.emit('clicked', gameObject)
      dog = this.add.sprite(gameObject.x, gameObject.y, 'doggy').play('excretion').setFlipX(true).setScale(gameObject.scale)
    }, this)

    button = this.add.image(centerX, centerY + 330, 'btn').setDepth(1)
    const buttonTextStyle = { color: '#fff8bc', fontFamily: 'sans-serif', fontSize: 48 }
    buttonText = this.add.text(centerX, centerY + 330, 'Play Now', buttonTextStyle).setDepth(3)
    const buttonURL = 'https://www.g5e.com/'

    button.setInteractive().on('pointerdown', () => window.open(buttonURL))
    buttonText.setOrigin(0.5).setShadow(2, 2, 'rgba(0,0,0,1)', 1)

    this.anims.create({
      key: 'excretion',
      frames: [{
        key: 'circle1'
      },
      {
        key: 'circle2'
      },
      {
        key: 'circle3'
      },
      {
        key: 'circle4'
      },
      {
        key: 'circle5'
      },
      {
        key: 'circle6'
      },
      {
        key: 'circle7'
      },
      {
        key: 'circle8'
      },
      {
        key: 'circle9'
      }],
      frameRate: 60,
      repeat: 0
    })
  }

  update() {

  }

  clickHandler(dogs) {
    found--

    dogs.off('clicked', this.clickHandler)
    dogs.input.enabled = false

    if (found === 0) this.end()
  }

  end() {
    this.input.off('doggy')

    this.tweens.add({
      targets: [button, buttonText],
      scale: .9,
      duration: 500,
      ease: 'Linear',
      repeat: -1,
      yoyo: true
    })

    const char = this.add.image(centerX - 380, centerY + 20, 'char').setDepth(2).setDepth(2).setScale(0.9).setAlpha(0)
    const logo = this.add.image(centerX, centerY - 200, 'logo').setDepth(2).setAlpha(0)
    const endTextStyle = { color: '#fff', fontFamily: 'sans-serif', fontSize: 74 }
    const endSubTextStyle = { color: '#fff', fontFamily: 'sans-serif', fontSize: 32 }
    const endText = this.add.text(centerX, centerY - 50, 'Great Job', endTextStyle).setOrigin(.5, .5).setDepth(3).setAlpha(0)
    const gradient = endText.context.createLinearGradient(0, 0, 0, endText.height);
    gradient.addColorStop(.4, '#fffda4');
    gradient.addColorStop(1, '#ffae00');
    endText.setFill(gradient)
    const endSubText = this.add.text(centerX, centerY + 50, 'Can you solve\nevery mystery?', endSubTextStyle).setOrigin(.5, .5).setDepth(3).setAlpha(0)

    this.tweens.add({
      targets: [overlay, char, logo, endText, endSubText],
      alpha: 0.9,
      duration: 500,
      delay: 1000,
      ease: 'Linear',
      repeat: 0,
      yoyo: false
    })
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1075,
  height: 767,
  scale: {
    mode: 3,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Scene]
}

const game = new Phaser.Game(config)