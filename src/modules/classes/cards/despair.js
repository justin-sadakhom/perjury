import { BrownCard, BrownCardNames } from './brown_card.js'
import { processAttack } from '../game.js'

class Despair extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.DESPAIR, rank, suit)
    }

    isPlayable(_player, _players) {
        return true
    }

    play(player, players, deck) {
        for (let i = 0; i < players.length; i++)
            processAttack(player, players, i, deck)
    }
}

export { Despair }