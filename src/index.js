import * as PIXI from 'pixi.js'
import { TruthBullet } from './modules/classes/cards/truth_bullet'

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
})
document.body.appendChild(app.view)

function renderHand(numCards) {
    let cards = []

    for (let i = 0; i < numCards; i++) {
        let x
        let y = app.view.height + 1250 * 0.25 / 4

        if (numCards % 2 === 0) {
            let spacing = 190 - (numCards - 2) * 10
            x = ((app.view.width / 2 - spacing / 2) - spacing * (numCards - 2) / 2) + spacing * i
        }
        else {
            let spacing = 200 - (numCards - 1) * 10
            x = (app.view.width / 2 - spacing * (numCards - 1) / 2) + spacing * i
        }

        const card = new TruthBullet('Ace', 'Spades')
        card.initPosition(x, y)
        card.setApp(app)
        cards.push(card)
    }

    for (let i = 0; i < cards.length; i++)
        app.stage.addChild(cards[i].sprite)
}

renderHand(10)