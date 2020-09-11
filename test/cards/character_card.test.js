import { CharacterCard, Characters, CharacterHealth } from '../../src/modules/classes/cards/character_card'

test("Constructor with standard parameters initializes fields correctly", () => {
    let card = new CharacterCard(Characters.KAEDE)
    expect(card.health).toBe(CharacterHealth[Characters.KAEDE])
})

test("Constructor with invalid name parameter throws TypeError", () => {
    let char
    expect(() => {
        char = new CharacterCard('Name')
    }).toThrow(TypeError('Invalid character name!'))
})