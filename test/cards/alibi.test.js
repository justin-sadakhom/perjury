import { Alibi } from '../../src/modules/classes/cards/alibi'
import { Deck } from '../../src/modules/classes/deck'
import { Player } from '../../src/modules/classes/player'
import { Skill } from '../../src/modules/classes/cards/skill'
import { TruthBullet } from '../../src/modules/classes/cards/truth_bullet'
import { Weapon } from '../../src/modules/classes/cards/weapon'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'

test("Constructor initializes name correctly", () => {
    let card = new Alibi('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.ALIBI)
})

test("Alibi.isPlayable() when a player has a weapon", () => {
    let players = []
    let deck = new Deck([])

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let weapon = new Weapon('Peacemaker', 'Ace', 'Spades')
    player.setWeapon(weapon, deck)
    players.push(player)

    let card = new Alibi('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(true)
})

test("Alibi.isPlayable() when a player has a skill", () => {
    let players = []

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill('Trust', 'Ace', 'Spades')
    player.hand.push(skill)
    player.addSkill(0)
    players.push(player)

    let card = new Alibi('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(true)
})

test("Alibi.isPlayable() when a player has a card in hand", () => {
    let players = []

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill('Trust', 'Ace', 'Spades')
    player.hand.push(skill)
    players.push(player)

    let card = new Alibi('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(true)
})

test("Alibi.isPlayable() when no player has a weapon, skill, or card in hand", () => {
    let players = []

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    players.push(player)

    let card = new Alibi('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(false)
})

test("Alibi.play() where the player chooses to discard a card", () => {
    let players = []
    let deck = new Deck([])

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let victimCard = new TruthBullet('Ace', 'Spades')
    enemy.hand.push(victimCard)

    players.push(player)
    players.push(enemy)

    let card = new Alibi('Ace', 'Spades')
    card.play(player, players, 0, deck)

    expect(enemy.hasEmptyHand()).toBe(true)
    expect(deck._discard.length).toBe(1)
})