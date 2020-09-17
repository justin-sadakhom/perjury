import { Game } from '../src/modules/classes/game'
import { RoleCard, Roles } from '../src/modules/classes/cards/role_card'

function countRoles(roles) {
    let count = [0, 0, 0, 0]

    for (let i = 0; i < roles.length; i++) {
        switch (roles[i].name) {
            case 'Protagonist':
                count[0] += 1
                break
            case 'Spotless':
                count[1] += 1
                break
            case 'Blackened':
                count[2] += 1
                break
            case 'Renegade':
                count[3] += 1
                break
        }
    }

    return count
}

test("Game._initRoles() with 4 players", () => {
    let game = new Game(4)
    let result = game._initRoles(4)
    let roleCount = countRoles(result)

    expect(result.length).toBe(4)
    expect(roleCount[0]).toBe(1)
    expect(roleCount[1]).toBe(0)
    expect(roleCount[2]).toBe(2)
    expect(roleCount[3]).toBe(1)
})

test("Game._initRoles() with 5 players", () => {
    let game = new Game(5)
    let result = game._initRoles(5)
    let roleCount = countRoles(result)

    expect(result.length).toBe(5)
    expect(roleCount[0]).toBe(1)
    expect(roleCount[1]).toBe(1)
    expect(roleCount[2]).toBe(2)
    expect(roleCount[3]).toBe(1)
})

test("Game._initRoles() with 6 players", () => {
    let game = new Game(6)
    let result = game._initRoles(6)
    let roleCount = countRoles(result)

    expect(result.length).toBe(6)
    expect(roleCount[0]).toBe(1)
    expect(roleCount[1]).toBe(1)
    expect(roleCount[2]).toBe(3)
    expect(roleCount[3]).toBe(1)
})

test("Game._initRoles() with 7 players", () => {
    let game = new Game(7)
    let result = game._initRoles(7)
    let roleCount = countRoles(result)

    expect(result.length).toBe(7)
    expect(roleCount[0]).toBe(1)
    expect(roleCount[1]).toBe(2)
    expect(roleCount[2]).toBe(3)
    expect(roleCount[3]).toBe(1)
})

test("Game._initCharacters() with 4 players", () => {
    let game = new Game(4)
    let result = game._initCharacters(4)
    expect(result.length).toBe(4)
})

test("Game._initCharacters() with 5 players", () => {
    let game = new Game(5)
    let result = game._initCharacters(5)
    expect(result.length).toBe(5)
})

test("Game._initCharacters() with 6 players", () => {
    let game = new Game(6)
    let result = game._initCharacters(6)
    expect(result.length).toBe(6)
})

test("Game._initCharacters() with 7 players", () => {
    let game = new Game(7)
    let result = game._initCharacters(7)
    expect(result.length).toBe(7)
})

test("Game._initCards()", () => {
    let game = new Game(4)
    let result = game._initCards()
    expect(result.length).toBe(69)
})