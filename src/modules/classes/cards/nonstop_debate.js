import { BrownCard, BrownCardNames } from './brown_card.js'

class NonstopDebate extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.NONSTOP_DEBATE, rank, suit)
    }

    isPlayable(_player, _players) {
        return true
    }

    play(player, _players, cardIndex, deck) {
        player.draw(2, deck)
    }
}

export { NonstopDebate }