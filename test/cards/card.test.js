import { Card } from '../../src/modules/classes/cards/card.js'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card.js'

test("Directly instantiating Card throws TypeError", () => {
    let card
    expect(() => {
        card = new Card('Name')
    }).toThrow(TypeError('Abstract class "Card" cannot be instantiated directly.'))
})

test("Constructor with standard parameter initializes fields correctly", () => {
    let card = new CharacterCard(Characters.KAEDE)
    expect(card.name).toBe(Characters.KAEDE)
})