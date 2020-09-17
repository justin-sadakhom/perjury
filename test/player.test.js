import { Player } from '../src/modules/classes/player'
import { RoleCard, Roles } from '../src/modules/classes/cards/role_card'
import { CharacterCard, Characters } from '../src/modules/classes/cards/character_card'
import {Weapon, WeaponNames} from '../src/modules/classes/cards/weapon'
import { Deck } from '../src/modules/classes/deck'
import {Skill, SkillNames} from "../src/modules/classes/cards/skill";
import {TruthBullet} from "../src/modules/classes/cards/truth_bullet";

test("Constructor initializes fields properly", () => {
    let role = new RoleCard(Roles.PROTAGONIST)
    let char = new CharacterCard(Characters.KAEDE)
    let player = new Player(role, char)

    expect(player.role).toBe(role)
    expect(player.character).toBe(char)
    expect(player.weapon).toBe(null)
    expect(player.skills.length).toBe(0)
    expect(player.health.current).toBe(5)
    expect(player.health.max).toBe(5)
    expect(player.hand.length).toBe(0)
    expect(player.bulletsFired).toBe(0)
    expect(player.underFire).toBe(false)
})

test("Player._initHealth() adds 1 extra health for protagonist role", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    expect(player.health.current).toBe(5)
    expect(player.health.max).toBe(5)
})

test("Player._initHealth() uses listed health for non-protagonist role", () => {
    let player = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KAEDE))
    expect(player.health.current).toBe(4)
    expect(player.health.max).toBe(4)
})

test("Player.setWeapon() replaces a null weapon", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let weapon = new Weapon('Peacemaker', 'Ace', 'Spades')
    player.setWeapon(weapon, deck)

    expect(player.weapon).toBe(weapon)
    expect(deck._discard.length).toBe(0)
})

test("Player.setWeapon() discards an existing weapon", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let weapon = new Weapon('Peacemaker', 'Ace', 'Spades')
    player.setWeapon(weapon, deck)

    let replacement = new Weapon('Rifle', 'Ace', 'Spades')
    player.setWeapon(replacement, deck)

    expect(player.weapon).toBe(replacement)
    expect(deck._discard.length).toBe(1)
    expect(deck._discard[0]).toBe(weapon)
})

test("Player.discardWeapon() adds current weapon to discard pile", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let weapon = new Weapon('Peacemaker', 'Ace', 'Spades')
    player.setWeapon(weapon, deck)
    player.discardWeapon(deck)

    expect(player.weapon).toBe(null)
    expect(deck._discard.length).toBe(1)
    expect(deck._discard[0]).toBe(weapon)
})

test("Player.hasWeapon() when player doesn't have a weapon", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    expect(player.hasWeapon()).toBe(false)
})

test("Player.hasWeapon() when player has a weapon", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let weapon = new Weapon('Peacemaker', 'Ace', 'Spades')
    player.setWeapon(weapon, deck)

    expect(player.hasWeapon()).toBe(true)
})

test("Player.addSkill() adds skill card to player skills", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    player.hand.push(skill)
    player.addSkill(0)

    expect(player.skills[0]).toBe(skill)
    expect(player.skills.length).toBe(1)
    expect(player.hand.length).toBe(0)
})

test("Player.discardSkill() removes the player skill", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    player.hand.push(skill)
    player.addSkill(0)
    player.discardSkill(0, deck)

    expect(player.skills.length).toBe(0)
    expect(deck._discard.length).toBe(1)
    expect(deck._discard[0]).toBe(skill)
})

test("Player.hasAnySkill() when player doesn't have skills", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    expect(player.hasAnySkill()).toBe(false)
})

test("Player.hasAnySkill() when player has a skill", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    player.hand.push(skill)
    player.addSkill(0)

    expect(player.hasAnySkill()).toBe(true)
})

test("Player.hasSkill() when player has Trust skill", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    player.hand.push(skill)
    player.addSkill(0)

    expect(player.hasSkill(SkillNames.TRUST)).toBe(true)
    expect(player.hasSkill(SkillNames.CONCENTRATION)).toBe(false)
    expect(player.hasSkill(SkillNames.PLOT_ARMOR)).toBe(false)
})

test("Player.isAlive() when player has no health", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.damage(5)
    expect(player.isAlive()).toBe(false)
})

test("Player.isAlive() when player has full health", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    expect(player.isAlive()).toBe(true)
})

test("Player.damage() when damage is 1", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.damage(1)
    expect(player.health.current).toBe(4)
})

test("Player.damage() when damage is greater than max health", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.damage(6)
    expect(player.health.current).toBe(0)
})

test("Player.heal() when player is damaged", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.damage(2)
    player.heal()
    expect(player.health.current).toBe(4)
})

test("Player.heal() when player is full health", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.heal()
    expect(player.health.current).toBe(5)
})

test("Player.hasEmptyHand() when player has no cards in hand", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    expect(player.hasEmptyHand()).toBe(true)
})

test("Player.hasEmptyHand() when player has one card in hand", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades'))
    expect(player.hasEmptyHand()).toBe(false)
})

test("Player.canPlay() with a skill they don't have equipped", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(new Skill(SkillNames.TRUST, 'Ace', 'Spades'))
    expect(player.canPlay(0, [])).toBe(true)
})

test("Player.canPlay() with a skill they already have equipped", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(new Skill(SkillNames.TRUST, 'Ace', 'Spades'))
    player.addSkill(0)

    player.hand.push(new Skill(SkillNames.TRUST, 'Ace', 'Spades'))
    expect(player.canPlay(0, [])).toBe(false)
})

test("Player.play() with a skill card", () => {
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let skill = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    player.hand.push(skill)
    player.play(0, [], deck)

    expect(player.hand.length).toBe(0)
    expect(player.skills.length).toBe(1)
    expect(deck._discard.length).toBe(1)
    expect(deck._discard[0]).toBe(skill)
})

test("Player.draw() with draw number 1 and not from discard", () => {
    let card = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let deck = new Deck([card])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.draw(1, deck)

    expect(player.hand.length).toBe(1)
    expect(player.hand[0]).toBe(card)
})

test("Player.draw() with draw number 2 and not from discard", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    let deck = new Deck([card1, card2])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.draw(2, deck)

    expect(player.hand.length).toBe(2)
    expect(player.hand[0]).toBe(card2)
    expect(player.hand[1]).toBe(card1)
})

test("Player.draw() with draw number 1 and from discard", () => {
    let card = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let deck = new Deck([])
    deck._discard.push(card)
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.draw(1, deck, true)

    expect(player.hand.length).toBe(1)
    expect(player.hand[0]).toBe(card)
})

test("Player.remove() with the first card in their hand", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(card1)
    player.hand.push(card2)

    console.log(player.hand)
    expect(player.remove(0)).toBe(card1)
    expect(player.hand.length).toBe(1)
})

test("Player.remove() with the second card in their hand", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Queen', 'Spades')
    let card2 = new Skill(SkillNames.TRUST, 'Ace', 'Spades')
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(card1)
    player.hand.push(card2)

    expect(player.remove(1)).toBe(card2)
    expect(player.hand.length).toBe(1)
})

test("Player.discardFromHand() adds chosen card to discard pile", () => {
    let card = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let deck = new Deck([])
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(card)
    player.discardFromHand(0, deck)

    expect(player.hand.length).toBe(0)
    expect(deck._discard.length).toBe(1)
    expect(deck._discard[0]).toBe(card)
})

test("Player.hasCard() searching a player holding a Peacemaker card for a weapon", () => {
    let card = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(card)
    expect(player.hasCard(Weapon)).toBe(true)
})

test("Player.hasCard() searching a player holding a Peacemaker card for a Truth Bullet", () => {
    let card = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.hand.push(card)
    expect(player.hasCard(TruthBullet)).toBe(false)
})

test("Player.steal() transfers target card from target to the player", () => {
    let card = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let target = new Player(new RoleCard(Roles.BLACKENED), new CharacterCard(Characters.KOKICHI))
    target.hand.push(card)
    player.steal(0, target)

    expect(target.hand.length).toBe(0)
    expect(player.hand.length).toBe(1)
    expect(player.hand[0]).toBe(card)
})

test("Player.addBullet() increments player bullet count", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.addBullet()

    expect(player.bulletsFired).toBe(1)
})

test("Player.resetBullets() resets player bullet count back to 0", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.addBullet()
    expect(player.bulletsFired).toBe(1)

    player.resetBullets()
    expect(player.bulletsFired).toBe(0)
})

test("Player.canFire() when player hasn't fired any bullets yet", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    expect(player.canFire()).toBe(true)
})

test("Player.canFire() when player has a Peacemaker", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let weapon = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    player.setWeapon(weapon)
    expect(player.canFire()).toBe(true)
})

test("Player.canFire() has fired a bullet and has a Peacemaker", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.addBullet()
    let weapon = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    player.setWeapon(weapon)
    expect(player.canFire()).toBe(true)
})

test("Player.canFire() has fired a bullet but has no Peacemaker", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.addBullet()
    expect(player.canFire()).toBe(false)
})

test("Player.underFire() changes underFire field", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    player.underFire = true
    expect(player.underFire).toBe(true)
})