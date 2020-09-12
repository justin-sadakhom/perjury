import { TruthBullet } from '../../src/modules/classes/cards/truth_bullet'
import { Player } from '../../src/modules/classes/player'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'
import {Deck} from "../../src/modules/classes/deck";

test("Constructor initializes name correctly", () => {
    let card = new TruthBullet('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.TRUTH_BULLET)
})

test("TruthBullet.isPlayable() when player can fire and a target is in range", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let players = [player, enemy]

    let card = new TruthBullet('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(true)
})

test("TruthBullet.isPlayable() when player cannot fire", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.addBullet()
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let players = [player, enemy]

    let card = new TruthBullet('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(false)
})

test("TruthBullet.isPlayable() when no target is in range", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let card = new TruthBullet('Ace', 'Spades')
    expect(card.isPlayable(player, [player])).toBe(false)
})

test("TruthBullet.play() successfully fires", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let players = [player, enemy]

    let card = new TruthBullet('Ace', 'Spades')
    card.play(player, players, 0, deck)

    expect(enemy.health.current).toBe(3)
})