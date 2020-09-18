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

test("Game.currentPlayer() starts with the Protagonist", () => {
    let game = new Game(4)
    expect(game.currentPlayer.role.name).toBe(Roles.PROTAGONIST)
})

test("Game.toNextPlayer() moves to the next player in the list", () => {
    let game = new Game(4)
    let index1
    let index2

    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].role.name === Roles.PROTAGONIST) {
            if (i + 1 === game.players.length)
                index2 = 0
            else
                index2 = i + 1

            index1 = i
        }
    }

    game.toNextPlayer()
    expect(game.currentPlayer).toBe(game.players[index2])
})

test("Game.protagonistIsAlive() when the Protagonist is dead", () => {
    let game = new Game(4)
    let pro

    for (let i = 0; i < game.players.length; i++)
        if (game.players[i].role.name === Roles.PROTAGONIST)
            pro = game.players[i]

    pro.damage(pro.health.max)
    expect(game.protagonistIsAlive()).toBe(false)
})

test("Game.protagonistIsAlive() when the Protagonist is alive", () => {
    let game = new Game(4)
    let pro

    for (let i = 0; i < game.players.length; i++)
        if (game.players[i].role.name === Roles.PROTAGONIST)
            pro = game.players[i]

    expect(game.protagonistIsAlive()).toBe(true)
})

test("Game.antagonistsAreAlive() when the Blackened is alive", () => {
    let game = new Game(4)
    let blackened

    for (let i = 0; i < game.players.length; i++)
        if (game.players[i].role.name === Roles.BLACKENED)
            blackened = game.players[i]

    expect(game.antagonistsAreAlive()).toBe(true)
})

test("Game.antagonistsAreAlive() when the Renegade is alive", () => {
    let game = new Game(4)
    let renegade

    for (let i = 0; i < game.players.length; i++)
        if (game.players[i].role.name === Roles.BLACKENED)
            renegade = game.players[i]

    expect(game.antagonistsAreAlive()).toBe(true)
})

test("Game.antagonistsAreAlive() when the Renegade and Blackened are all dead", () => {
    let game = new Game(4)

    for (let i = 0; i < game.players.length; i++)
        if (game.players[i].role.name !== Roles.PROTAGONIST)
            game.players[i].damage(game.players[i].health.max)

    expect(game.antagonistsAreAlive()).toBe(false)
})

/*
test("Game.start()", () => {
    let game = new Game(4)
    game.start()
    expect(!game.antagonistsAreAlive() || !game.protagonistIsAlive()).toBe(true)
})
*/