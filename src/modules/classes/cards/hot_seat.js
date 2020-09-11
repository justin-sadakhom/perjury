import { BrownCard, BrownCardNames } from './brown_card.js'
import { gamePrompt } from '../prompt.js'
import { selectTargetIndex } from '../game.js'

class HotSeat extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.HOT_SEAT, rank, suit)
    }

    isPlayable(player, players) {
        return player.playersInRange(players, false) > 0
    }

    play(player, players, cardIndex, _deck) {
        let target = players[selectTargetIndex(player.playersInRange(players))]

        // Prompt for which card the player wants to steal.
        let choice = ''
        gamePrompt('Which card do you want to steal?', choice)

        player.steal(parseInt(choice), target)
    }
}

export { HotSeat }