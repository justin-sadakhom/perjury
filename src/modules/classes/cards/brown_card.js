import { PlayingCard } from './playing_card.js'

const BrownCardNames = Object.freeze({
    TRUTH_BULLET: "Truth Bullet",
    PERJURY: "Perjury",
    HOT_SEAT: "Hot Seat",
    ALIBI: "Alibi",
    PRESENT: "Present",
    HOPE: "Hope",
    DESPAIR: "Despair",
    NONSTOP_DEBATE: "Nonstop Debate",
    HANGMAN_GAMBIT: "Hangman's Gambit",
})

class BrownCard extends PlayingCard {

    constructor(name, rank, suit) {
        if (!(Object.values(BrownCardNames).includes(name)))
            throw new TypeError('Invalid single-use card name!')

        super(name, rank, suit);
    }
}

export { BrownCard, BrownCardNames}