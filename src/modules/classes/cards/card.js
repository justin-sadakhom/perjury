class Card {

    constructor(name) {
        if (this.constructor === Card)
            throw new TypeError('Abstract class "Card" cannot be instantiated directly.')

        this._name = name
    }

    get name() {
        return this._name
    }
}

export { Card }