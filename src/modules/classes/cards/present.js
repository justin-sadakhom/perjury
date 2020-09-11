import { BrownCard, BrownCardNames } from './brown_card.js'

class Present extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.PRESENT, rank, suit)
    }

    isPlayable(player, players) {
        return players.length > 2 && (player.underFire() && player.health.current === 1)
    }

    play(player, _players, cardIndex, _deck) {
        player.heal()
    }
}

export { Present }