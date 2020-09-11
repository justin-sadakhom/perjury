import { BrownCard, BrownCardNames } from './brown_card.js'
import { processAttack, selectTargetIndex } from '../game.js'

class TruthBullet extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.TRUTH_BULLET, rank, suit)
    }

    isPlayable(player, players) {
        return player.canFire() && player.playersInRange(players) > 0
    }

    play(player, players, deck) {
        let targetIndex = selectTargetIndex(player.playersInRange(players))
        processAttack(player, players, targetIndex, deck)
    }
}

export { TruthBullet }