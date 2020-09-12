import { Present } from '../../src/modules/classes/cards/present'
import { Player } from '../../src/modules/classes/player'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'
import {Deck} from "../../src/modules/classes/deck";

test("Constructor initializes name correctly", () => {
    let card = new Present('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.PRESENT)
})

test("Present.isPlayable() when player is at the brink of death", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.underFire = true
    player._health._current = 1

    let card = new Present('Ace', 'Spades')
    expect(card.isPlayable(player, [])).toBe(true)
})

test("Present.isPlayable() when there are more than 2 players", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy1 = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let enemy2 = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOREKIYO))
    let players = [player, enemy1, enemy2]

    let card = new Present('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(true)
})

test("Present.isPlayable() when there are 2 players and the player is not under fire", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player._health._current = 1
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let players = [player, enemy]

    let card = new Present('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(false)
})

test("Present.isPlayable() when there are 2 players and the player is not at critical health", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.underFire = true
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let players = [player, enemy]

    let card = new Present('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(false)
})

test("Present.play() successfully heals", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.damage(2)

    let card = new Present('Ace', 'Spades')
    card.play(player, [], 0, deck)

    expect(player.health.current).toBe(4)
})