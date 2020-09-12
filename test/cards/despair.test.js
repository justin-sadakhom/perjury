import { Despair } from '../../src/modules/classes/cards/despair'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import {Deck} from "../../src/modules/classes/deck";
import {Player} from "../../src/modules/classes/player";
import {RoleCard, Roles} from "../../src/modules/classes/cards/role_card";
import {CharacterCard, Characters} from "../../src/modules/classes/cards/character_card";

test("Constructor initializes name correctly", () => {
    let card = new Despair('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.DESPAIR)
})

test("Alibi.isPlayable() always returns true", () => {
    let card = new Despair('Ace', 'Spades')
    expect(card.isPlayable()).toBe(true)
})


test("Alibi.play() when there are 2+ opposing players", () => {
    let deck = new Deck([])

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy1 = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let enemy2 = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOREKIYO))
    let players = [player, enemy1, enemy2]

    let card = new Despair('Ace', 'Spades')
    card.play(player, players, 0, deck)

    expect(enemy1.health.current).toBe(enemy1.health.max - 1)
    expect(enemy2.health.current).toBe(enemy2.health.max - 1)
    expect(player.health.current).toBe(player.health.max)
})