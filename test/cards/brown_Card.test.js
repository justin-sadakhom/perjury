import { BrownCard } from '../../src/modules/classes/cards/brown_card.js'

test("Constructor with invalid name parameter throws TypeError", () => {
    let card
    expect(() => {
        card = new BrownCard('Lie Bullet', 'Ace', 'Spades')
    }).toThrow(TypeError)
})

test("Directly instantiating BrownCard throws TypeError", () => {
    let card
    expect(() => {
        card = new BrownCard('Name', 'Ace', 'Spades')
    }).toThrow(TypeError)
})