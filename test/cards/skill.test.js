import {Skill, SkillNames} from '../../src/modules/classes/cards/skill'
import { Player } from '../../src/modules/classes/player'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'
import { Deck } from '../../src/modules/classes/deck'

test("Constructor with invalid name parameter throws TypeError", () => {
    let skill
    expect(() => {
        skill = new Skill('Name', 'Ace', 'Spades')
    }).toThrow(TypeError('Invalid skill name!'))
})

test("Skill.isPlayable() when player doesn't already have the skill", () => {
    let players = []
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let card = new Skill('Trust', 'Ace', 'Spades')

    expect(card.isPlayable(player, players)).toBe(true)
})

test("Skill.isPlayable() when player already has the skill", () => {
    let players = []
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))

    let card = new Skill('Trust', 'Ace', 'Spades')
    let dupe = new Skill('Trust', 'King', 'Spades')
    player.hand.push(dupe)
    player.addSkill(0)

    expect(card.isPlayable(player, players)).toBe(false)
})

test("Skill.play() correctly adds skill to player", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))

    let card = new Skill('Trust', 'Ace', 'Spades')
    player.hand.push(card)
    card.play(player, [player], 0, deck)

    expect(player.hasSkill(SkillNames.TRUST)).toBe(true)
})