import { BlueCard } from './blue_card.js'

const WeaponNames = Object.freeze({
    PEACEMAKER: "Peacemaker",
    PISTOL: "Pistol",
    CARBINE: "Carbine",
    RIFLE: "Rifle",
    SNIPER_RIFLE: "Sniper Rifle"
})

const WeaponRanges = Object.freeze({
    PEACEMAKER: 1,
    PISTOL: 2,
    CARBINE: 3,
    RIFLE: 4,
    SNIPER_RIFLE: 5
})

class Weapon extends BlueCard {

    constructor(name, rank, suit) {
        if (!(Object.values(WeaponNames).includes(name)))
            throw new TypeError('Invalid weapon name!')

        super(name, rank, suit)
        this._range = WeaponRanges[name.toUpperCase().replace(' ', '_')]
    }

    get range() {
        return this._range
    }

    isPlayable(_player, _players) {
        return true
    }

    play(player, _players, cardIndex, deck) {
        player.setWeapon(player.remove(cardIndex), deck)
    }
}

export { Weapon, WeaponNames }