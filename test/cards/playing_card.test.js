import { PlayingCard, Ranks, Suits} from '../../src/modules/classes/cards/playing_card.js'
import { TruthBullet } from "../../src/modules/classes/cards/truth_bullet";

test("Constructor with standard parameters initializes fields correctly", () => {
    let card = new TruthBullet('Ace', 'Spades')
    expect(card.rank).toBe(Ranks.A)
    expect(card.suit).toBe(Suits.Spades)
})

test("Directly instantiating PlayingCard throws TypeError", () => {
    let card
    expect(() => {
        card = new PlayingCard('Name', 'Ace', 'Spades')
    }).toThrow(TypeError)
})

test("Constructor with invalid rank parameter throws TypeError", () => {
    let card
    expect(() => {
        card = new TruthBullet('Number One', 'Spades')
    }).toThrow(TypeError)
})

test("Constructor with invalid suit parameter throws TypeError", () => {
    let card
    expect(() => {
        card = new TruthBullet('Ace', 'Tuxedo')
    }).toThrow(TypeError)
})

test("Dummy constructor that doesn't implement isPlayable() method throws TypeError", () => {
    let dummy

    expect(() => {
        class TestCard extends PlayingCard {

            constructor(name, rank, suit) {
                super(name, rank, suit)
            }
        }

        dummy = new TestCard('Name', 'Ace', 'Spades')
    }).toThrow(TypeError)
})

test("Dummy constructor that doesn't implement play() method throws TypeError", () => {
    let dummy

    expect(() => {
        class TestCard extends PlayingCard {

            constructor(name, rank, suit) {
                super(name, rank, suit)
            }

            isPlayable() {
                return true
            }
        }

        dummy = new TestCard('Name', 'Ace', 'Spades')
    }).toThrow(TypeError)
})