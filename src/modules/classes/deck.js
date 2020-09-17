class Deck {

    constructor(cards) {
        this._drawPile = cards
        this._discard = []
    }

    peek() {
        let peek = this._drawPile.pop()
        this._drawPile.push(peek)
        return peek
    }

    draw(fromDiscard=false) {

        if (!fromDiscard) {
            let drawn = this._drawPile.pop()

            if (this._drawPile.length === 0)
                this.reset()

            return drawn
        }

        else
            return this._discard.pop()
    }

    addDiscard(card) {
        this._discard.push(card)
    }

    shuffle() {
        let clone = []

        for (let i = 0; i < this._drawPile.length; i++)
            clone.push(this._drawPile.pop())

        while (clone.length > 0) {
            let randomIndex = Math.floor(Math.random() * clone.length)
            this._drawPile.push(clone[randomIndex])
            clone.splice(randomIndex)
        }
    }

    reset() {
        for (let i = 0; i < this._discard.length; i++)
            this._drawPile.push(this._discard.pop())

        this.shuffle()
    }
}

export { Deck }