import { PlayingCard } from './playing_card.js'

class BlueCard extends PlayingCard {

    constructor(name, rank, suit) {
        super(name, rank, suit)

        if (this.constructor === BlueCard)
            throw new TypeError('Abstract class "BlueCard" cannot be instantiated directly.')
    }

    isPlayable() {
        throw new Error('You have to implement isPlayable()!')
    }

    play() {
        throw new Error('You have to implement play()!')
    }
}

export { BlueCard}