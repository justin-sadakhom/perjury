import { BrownCard, BrownCardNames } from './brown_card.js'

class Perjury extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.PERJURY, rank, suit)
    }

    isPlayable(player, _players) {
        return player.underFire()
    }

    play(player, _players, cardIndex, _deck) {
        player.setUnderFire(false)
    }
}

export { Perjury }