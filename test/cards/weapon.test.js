import { Weapon, WeaponNames } from '../../src/modules/classes/cards/weapon'
import {Player} from '../../src/modules/classes/player'
import {RoleCard, Roles} from '../../src/modules/classes/cards/role_card'
import {CharacterCard, Characters} from '../../src/modules/classes/cards/character_card'
import {Deck} from '../../src/modules/classes/deck'

test("Constructor with standard parameters initializes fields correctly", () => {
    let weapon = new Weapon('Peacemaker', 'Ace', 'Spades')
    expect(weapon.range).toBe(1)
})

test("Constructor with invalid name parameter throws TypeError", () => {
    let weapon
    expect(() => {
        weapon = new Weapon('Name', 'Ace', 'Spades')
    }).toThrow(TypeError)
})

test('Weapon.isPlayable() returns expected value', () => {
    let players = []
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let card = new Weapon('Peacemaker', 'Ace', 'Spades')

    expect(card.isPlayable(player, players)).toBe(true)
})

test('Weapon.play() correctly sets player weapon', () => {
    let players = []
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))

    player.hand.push(new Weapon('Peacemaker', 'Ace', 'Spades'))
    player.hand[0].play(player, players, 0, deck)

    expect(player.hasWeapon()).toBe(true)
    expect(player.weapon.name === WeaponNames.PEACEMAKER)
})