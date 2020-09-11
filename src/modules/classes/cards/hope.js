import {BrownCard, BrownCardNames } from './brown_card.js'

class Hope extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.HOPE, rank, suit)
    }

    isPlayable(_player, _players) {
        return true
    }

    play(player, players, cardIndex, _deck) {
        for (let i = 0; i < players.length; i++)
            players[i].heal()
    }
}

export { Hope }