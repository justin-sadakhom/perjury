import { HangmanGambit } from '../../src/modules/classes/cards/hangman_gambit'
import { BrownCardNames } from '../../src/modules/classes/cards/brown_card'
import { RoleCard, Roles } from '../../src/modules/classes/cards/role_card'
import { CharacterCard, Characters } from '../../src/modules/classes/cards/character_card'
import { Player } from '../../src/modules/classes/player'
import { Deck } from '../../src/modules/classes/deck'
import { TruthBullet } from '../../src/modules/classes/cards/truth_bullet'

test("Constructor initializes name correctly", () => {
    let card = new HangmanGambit('Ace', 'Spades')
    expect(card.name).toBe(BrownCardNames.HANGMAN_GAMBIT)
})

test("HangmanGambit.isPlayable() always returns true", () => {
    let card = new HangmanGambit('Ace', 'Spades')
    expect(card.isPlayable()).toBe(true)
})

test("HangmanGambit.play() draws the top 3 cards from the deck", () => {
    let player = new Player(new RoleCard(Roles.PROTAGONIST), new CharacterCard(Characters.KAEDE))
    let toDraw = new TruthBullet('Ace', 'Spades')
    let deck = new Deck([toDraw, toDraw, toDraw])

    let card = new HangmanGambit('Ace', 'Spades')
    card.play(player, [player], 0, deck)

    expect(player.hand.length).toBe(3)
    expect(player.remove(2)).toBe(toDraw)
    expect(player.remove(1)).toBe(toDraw)
    expect(player.remove(0)).toBe(toDraw)
})