class Health {

    constructor(amount) {
        if (amount <= 0)
            throw new RangeError('Non-positive value for health!')

        this._current = amount
        this._max = amount
    }

    get current() {
        return this._current
    }

    add(value) {
        if (this._current + value > this._max)
            this._current = this._max
        else
            this._current += value
    }

    deduct(value) {
        if (this.current - value < 0)
            this._current = 0
        else
            this._current -= value
    }

    get max() {
        return this._max
    }
}

export { Health }