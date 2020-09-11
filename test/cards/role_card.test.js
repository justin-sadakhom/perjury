import {RoleCard, Roles} from '../../src/modules/classes/cards/role_card.js'

test("Constructor with invalid name parameter throws TypeError", () => {
    let char
    expect(() => {
        char = new RoleCard('Name')
    }).toThrow(TypeError)
})

test("Card.flip() reverts card orientation for Protagonist role", () => {
    let card = new RoleCard(Roles.PROTAGONIST)
    card.flip()
    expect(card.faceDown).toBe(true)
})

test("Card.flip() inverts card orientation for any other role", () => {
    let card = new RoleCard(Roles.BLACKENED)
    card.flip()
    expect(card.faceDown).toBe(false)
})