import { BlueCard } from '../../src/modules/classes/cards/blue_card'

test("Directly instantiating BlueCard throws TypeError", () => {
    let card
    expect(() => {
        card = new BlueCard('Name', 'Ace', 'Spades')
    }).toThrow(TypeError('Abstract class "BlueCard" cannot be instantiated directly.'))
})