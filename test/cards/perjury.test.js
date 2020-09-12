import { Perjury } from '../../src/modules/classes/cards/perjury'
import { Player } from '../../src/modules/classes/player'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'

test("Constructor initializes name correctly", () => {
    let card = new Perjury('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.PERJURY)
})

test("Perjury.isPlayable() when player is under fire", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.underFire = true

    let card = new Perjury('Ace', 'Spades')
    expect(card.isPlayable(player, [])).toBe(true)
})

test("Perjury.isPlayable() when player is not under fire", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let card = new Perjury('Ace', 'Spades')
    expect(card.isPlayable(player, [])).toBe(false)
})

test("Perjury.play() successfully negates fire", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.underFire = true

    let card = new Perjury('Ace', 'Spades')
    card.play(player, [])

    expect(player.underFire).toBe(false)
})