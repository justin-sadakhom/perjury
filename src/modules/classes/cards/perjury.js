import { BrownCard, BrownCardNames } from './brown_card.js'

class Perjury extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.PERJURY, rank, suit)
    }

    isPlayable(player, _players) {
        return player.underFire
    }

    play(player, _players, _cardIndex, _deck) {
        player.underFire = false
    }
}

export { Perjury }