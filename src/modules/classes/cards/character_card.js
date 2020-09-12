import { Card } from './card.js'

const Characters = Object.freeze({
    KAEDE: "Kaede",
    ANGIE: "Angie",
    GONTA: "Gonta",
    HIMIKO: "Himiko",
    K1_B0: "K1-BO",
    KAITO: "Kaito",
    KIRUMI: "Kirumi",
    KOKICHI: "Kokichi",
    KOREKIYO: "Korekiyo",
    MAKI: "Maki",
    MIU: "Miu",
    RANTARO: "Rantaro",
    RYOMA: "Ryoma",
    SHUICHI: "Shuichi",
    TENKO: "Tenko",
    TSUMUGI: "Tsumugi"
})

const CharacterHealth = Object.freeze({
    KAEDE: 4,
    ANGIE: 4,
    GONTA: 4,
    HIMIKO: 4,
    K1_B0: 4,
    KAITO: 4,
    KIRUMI: 4,
    KOKICHI: 4,
    KOREKIYO: 4,
    MAKI: 4,
    MIU: 4,
    RANTARO: 4,
    RYOMA: 4,
    SHUICHI: 4,
    TENKO: 4,
    TSUMUGI: 4
})

class CharacterCard extends Card {

    constructor(name) {
        if (!(Object.values(Characters).includes(name)))
            throw new TypeError('Invalid character name!')

        super(name)
        this._health = CharacterHealth[name.toUpperCase()]
    }

    get health() {
        return this._health
    }
}

export { CharacterCard, Characters, CharacterHealth }