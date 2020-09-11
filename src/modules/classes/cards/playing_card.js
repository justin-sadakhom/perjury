import { Card } from './card.js'

const Ranks = Object.freeze({
    A: "Ace",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    J: "Jack",
    Q: "Queen",
    K: "King"
})

const Suits = Object.freeze({
    Clubs: "Clubs",
    Diamonds: "Diamonds",
    Hearts: "Hearts",
    Spades: "Spades"
})

class PlayingCard extends Card {

    constructor(name, rank, suit) {
        super(name)

        if (this.constructor === PlayingCard)
            throw new TypeError('Abstract class "PlayingCard" cannot be instantiated directly.')

        if (this.isPlayable === undefined)
            throw new TypeError('All subclasses must implement the isPlayable() method.')

        if (this.play === undefined)
            throw new TypeError('All subclasses must implement the play() method.')

        if (!(Object.values(Ranks).includes(rank)))
            throw new TypeError('Invalid rank!')

        if (!(Object.values(Suits).includes(suit)))
            throw new TypeError('Invalid suit!')

        this._rank = rank
        this._suit = suit
    }

    get rank() {
        return this._rank
    }

    get suit() {
        return this._suit
    }
}

export { PlayingCard, Ranks, Suits }