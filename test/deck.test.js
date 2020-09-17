import { Weapon, WeaponNames } from '../src/modules/classes/cards/weapon'
import { Deck } from '../src/modules/classes/deck'

test("Constructor initializes fields properly", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Weapon(WeaponNames.PISTOL, 'Ace', 'Spades')
    let deck = new Deck([card1, card2])

    expect(deck._discard.length).toBe(0)
    expect(deck._drawPile.length).toBe(2)
    expect(deck._drawPile[0]).toBe(card1)
    expect(deck._drawPile[1]).toBe(card2)
})

test("Deck.peek() returns top card without mutating draw pile", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Weapon(WeaponNames.PISTOL, 'Ace', 'Spades')
    let deck = new Deck([card1, card2])
    let peek = deck.peek()

    expect(deck._drawPile.length).toBe(2)
    expect(deck._drawPile[0]).toBe(card1)
    expect(deck._drawPile[1]).toBe(card2)
    expect(peek).toBe(card2)
})

test("Deck.draw() with the draw pile", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Weapon(WeaponNames.PISTOL, 'Ace', 'Spades')
    let deck = new Deck([card1, card2])
    let drawn = deck.draw()

    expect(deck._drawPile.length).toBe(1)
    expect(deck._drawPile[0]).toBe(card1)
    expect(drawn).toBe(card2)
})

test("Deck.draw() with the discard pile", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Weapon(WeaponNames.PISTOL, 'Ace', 'Spades')
    let deck = new Deck([card1])
    deck._discard.push(card2)
    let drawn = deck.draw(true)

    expect(deck._discard.length).toBe(0)
    expect(deck._drawPile.length).toBe(1)
    expect(deck._drawPile[0]).toBe(card1)
    expect(drawn).toBe(card2)
})

test("Deck.addDiscard() with an arbitrary card", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let deck = new Deck([card1])
    deck.addDiscard(card1)

    expect(deck._discard.length).toBe(1)
    expect(deck._discard[0]).toBe(card1)
})

test("Deck.shuffle() rearranges all the cards", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Weapon(WeaponNames.PISTOL, 'Ace', 'Spades')
    let deck = new Deck([card1, card2])
    deck.shuffle()

    expect(deck._drawPile.length).toBe(2)
    expect(deck._drawPile.includes(card1)).toBe(true)
    expect(deck._drawPile.includes(card2)).toBe(true)
})

test("Deck.reset() puts all discarded cards back into the draw pile", () => {
    let card1 = new Weapon(WeaponNames.PEACEMAKER, 'Ace', 'Spades')
    let card2 = new Weapon(WeaponNames.PISTOL, 'Ace', 'Spades')
    let deck = new Deck([card1])
    deck._discard.push(card2)
    deck.reset()

    expect(deck._drawPile.length).toBe(2)
    expect(deck._drawPile.includes(card1)).toBe(true)
    expect(deck._drawPile.includes(card2)).toBe(true)
})