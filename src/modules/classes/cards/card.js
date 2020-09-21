import * as PIXI from 'pixi.js'

class Card {

    constructor(name) {
        if (this.constructor === Card)
            throw new TypeError('Abstract class "Card" cannot be instantiated directly.')

        this._name = name
        const fileName = name.toLowerCase().replace(' ', '_')
        const texture = PIXI.Texture.from('../img/cards/' + fileName + '.png')
        this.sprite = new PIXI.Sprite(texture)
        this.dragging = false

        this.sprite.anchor.set(0.5, 1)
        this.sprite.scale.x = 0.25
        this.sprite.scale.y = 0.25
        this.sprite.interactive = true
        this.sprite.buttonMode = true

        this.defaultX = null
        this.defaultY = null
        this.app = null

        this.sprite
            .on('pointerover', this.onButtonOver, this)
            .on('pointerout', this.onButtonOut, this)
            .on('pointertap', this.onClickStart, this)
            .on('pointermove', this.onClickMove, this)
    }

    get name() {
        return this._name
    }

    setApp(app) {
        this.app = app
    }

    initPosition(x, y) {
        this.sprite.x = x
        this.sprite.y = y
        this.defaultX = x
        this.defaultY = y
    }

    onButtonOver() {
        if (!this.dragging) {
            this.sprite.y = this.app.view.height
            this.sprite.scale.x *= 1.4
            this.sprite.scale.y *= 1.4
        }
    }

    onButtonOut() {
        if (!this.dragging) {
            this.sprite.y = this.defaultY
            this.sprite.scale.x /= 1.4
            this.sprite.scale.y /= 1.4
        }
    }

    onClickStart() {
        this.dragging = !this.dragging

        if (!this.dragging) {
            this.sprite.x = this.defaultX
            this.sprite.y = this.defaultY
            this.sprite.anchor.set(0.5, 1)
        }
        else
            this.sprite.anchor.set(0.5, 0.5)
    }

    onClickMove() {
        if (this.dragging) {
            const newPosition = this.app.renderer.plugins.interaction.mouse.global
            this.sprite.x = newPosition.x
            this.sprite.y = newPosition.y
        }
    }
}

export { Card }