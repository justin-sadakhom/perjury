import { Card } from './card.js'

const Roles = Object.freeze ({
    PROTAGONIST: "Protagonist",
    SPOTLESS: "Spotless",
    BLACKENED: "Blackened",
    RENEGADE: "Renegade"
})

class RoleCard extends Card {

    constructor(role) {

        if (!(Object.values(Roles).includes(role)))
            throw new TypeError('Invalid role!')

        super(role)
        this._face_down = this._name !== Roles.PROTAGONIST
    }

    get faceDown() {
        return this._face_down
    }

    flip() {
        this._face_down = !this._face_down
    }
}

export { Roles, RoleCard }