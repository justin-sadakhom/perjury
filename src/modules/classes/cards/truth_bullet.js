import { BrownCard, BrownCardNames } from './brown_card.js'
import { processAttack, selectTargetIndex } from '../game.js'

class TruthBullet extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.TRUTH_BULLET, rank, suit)
    }

    isPlayable(player, players) {
        return player.canFire() && player.playersInRange(players).length > 0
    }

    play(player, players, _cardIndex, deck) {
        let validTargets = player.playersInRange(players)
        let targetIndex = selectTargetIndex(validTargets)
        processAttack(player, validTargets, targetIndex, deck)
        player.addBullet()
    }
}

export { TruthBullet }