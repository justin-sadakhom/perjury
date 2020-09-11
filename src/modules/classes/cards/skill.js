import { BlueCard } from './blue_card.js'

const SkillNames = Object.freeze({
    TRUST: "Trust",
    CONCENTRATION: "Concentration",
    PLOT_ARMOR: "Plot Armor"
})

class Skill extends BlueCard {

    constructor(name, rank, suit) {
        if (!(Object.values(SkillNames).includes(name)))
            throw new TypeError('Invalid skill name!')

        super(name, rank, suit)
    }

    isPlayable(player, _players) {
        return !player.hasSkill(this.name)
    }

    play(player, _players, cardIndex, _discard, _drawPile) {
        player.addSkill(cardIndex)
    }
}

export { Skill, SkillNames }