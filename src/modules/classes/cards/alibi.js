import { BrownCard, BrownCardNames } from './brown_card.js'
import { selectCardIndex, selectCardType, selectTargetIndex } from '../game.js'

class Alibi extends BrownCard {

    constructor(rank, suit) {
        super(BrownCardNames.ALIBI, rank, suit)
    }

    isPlayable(_player, players) {
        // Check if any player has a card that can be discarded.
        for (let i = 0; i < players.length; i++)
            if (players[i].hasWeapon() || players[i].hasAnySkill() || !(players[i].hasEmptyHand()))
                return true

        return false
    }

    play(player, players, cardIndex, deck) {
        // Prompt for which player to target.
        let validTargets = []

        for (let i = 0; i < players.length; i++)
            if (players[i] !== player && (players[i].hasWeapon() || players[i].hasAnySkill() || !(players[i].hasEmptyHand())))
                validTargets.push(players[i])

        let target = validTargets[selectTargetIndex(validTargets)]

        // Display the appropriate prompt message.
        let message = ''

        if (target.hasWeapon())
            message += 'Their weapon? (0)'
        if (target.hasAnySkill())
            message += 'One of their skills? (1)'
        if (!(target.hasEmptyHand()))
            message += 'From their hand? (2)'

        // Prompt what type of card to discard.
        let choice = selectCardType()

        // Force target to discard that.
        switch (choice) {
            case 0:
                target.discardWeapon(deck)
                break
            case 1:
                target.discardSkill(selectCardIndex(target, false), deck)
                break
            case 2:
                target.discardFromHand(selectCardIndex(target), deck)
                break
        }
    }
}

export { Alibi }