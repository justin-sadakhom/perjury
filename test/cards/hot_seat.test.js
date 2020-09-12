import { HotSeat } from '../../src/modules/classes/cards/hot_seat'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import { Player } from '../../src/modules/classes/player'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'
import { Skill, SkillNames } from '../../src/modules/classes/cards/skill'
import {Deck} from "../../src/modules/classes/deck";
import {TruthBullet} from "../../src/modules/classes/cards/truth_bullet";

test("Constructor initializes name correctly", () => {
    let card = new HotSeat('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.HOT_SEAT)
})

test("HotSeat.isPlayable() when a player is in range", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let players = [player, enemy]

    let card = new HotSeat('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(true)
})

test("HotSeat.isPlayable() when a player is not in range", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    enemy.hand.push(new Skill(SkillNames.TRUST, 'Ace', 'Spades'))
    enemy.addSkill(0)
    let players = [player, enemy]

    let card = new HotSeat('Ace', 'Spades')
    expect(card.isPlayable(player, players)).toBe(false)
})

test("HotSeat.play() properly steals the target's card", () => {
    let deck = new Deck([])

    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let enemy = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    let victimCard = new TruthBullet('Ace', 'Spades')
    enemy.hand.push(victimCard)
    let players = [player, enemy]

    let card = new HotSeat('Ace', 'Spades')
    card.play(player, players, 0, deck)

    expect(enemy.hasEmptyHand()).toBe(true)
    expect(player.hand.length).toBe(1)
    expect(player.remove(0)).toBe(victimCard)
})