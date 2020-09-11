import { BrownCard, BrownCardNames } from './brown_card.js'

class HangmanGambit extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.HANGMAN_GAMBIT, rank, suit)
    }

    isPlayable(_player, _players) {
        return true
    }

    play(player, _players, cardIndex, deck) {
        player.draw(3, deck)
    }
}

export { HangmanGambit }