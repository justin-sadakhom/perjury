import { BrownCard, BrownCardNames } from './brown_card.js'
import { selectCardIndex, selectTargetIndex } from '../game.js'

class HotSeat extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.HOT_SEAT, rank, suit)
    }

    isPlayable(player, players) {
        return player.playersInRange(players, false).length > 0
    }

    play(player, players, cardIndex, _deck) {
        let validTargets = player.playersInRange(players, false)
        let target = validTargets[selectTargetIndex(validTargets)]
        let choice = selectCardIndex(target)
        player.steal(choice, target)
    }
}

export { HotSeat }