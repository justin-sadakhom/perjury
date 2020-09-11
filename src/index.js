const dictionary = Object.freeze({
    A: 'a',
    B: 'b'
})

let state = !'A' in dictionary
console.log(state)