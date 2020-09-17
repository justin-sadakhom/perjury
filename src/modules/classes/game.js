import { Suits } from './cards/playing_card.js'
import { CharacterCard, Characters } from './cards/character_card.js'
import { Deck } from './deck.js'
import { Perjury } from './cards/perjury.js'
import { Player } from './player.js'
import { Present } from './cards/present.js'
import { RoleCard, Roles} from './cards/role_card.js'
import { Skill, SkillNames } from './cards/skill.js'
import { Weapon, WeaponNames } from './cards/weapon.js'
import { HangmanGambit } from './cards/hangman_gambit.js'
import { NonstopDebate } from './cards/nonstop_debate.js'
import { TruthBullet } from './cards/truth_bullet.js'
import { Alibi } from './cards/alibi.js'
import { Despair } from './cards/despair.js'
import { Hope } from './cards/hope.js'
import { HotSeat } from './cards/hot_seat.js'

function selectTargetIndex(players) {
    let text = "Who do you want to target?" + '\n'

    for (let i = 0; i < players.length; i++)
        text += '[' + i + '] '

    console.log(text.slice(0, text.length - 1))

    // Return index of first player in list.
    // Will implement actual selection later.
    return 0
}

function selectCardType() {
    let text = "Select card from where?" + '\n'
    text += "[Weapon (0)] [Skill (1)] [Hand (2)]"
    console.log(text)

    // Return index signifying hand.
    // Will implement actual selection later.
    return 2
}

function selectCardIndex(player, fromHand=true) {
    let text = "Which card will you select?" + '\n'

    if (fromHand)
        for (let i = 0; i < player.hand.length; i++)
            text += '[' + i + '] '
    else
        for (let i = 0; i < player.skills.length; i++)
            text += '[' + i + '] '

    console.log(text.slice(0, text.length - 1))

    // Return index of first card in list.
    // Will implement actual selection later.
    return 0
}

function processAttack(player, players, targetIndex, deck) {

    let target = players[targetIndex]
    target.underFire = true
    let shielded = false

    if (target.hasSkill(SkillNames.PLOT_ARMOR)) {
        let drawn = deck.peek()

        if (drawn.suit === Suits.Hearts)
            shielded = true

        deck.addDiscard(drawn)
    }

    if (!shielded && (target.hasCard(Perjury) || (target.hasCard(Present) && target.health().current === 1))) {
        let choice = selectCardIndex(target)

        if (choice === -1)
            target.damage(1)

        else {
            let cardIndex = choice

            if (target.canPlay(cardIndex))
                target.play(target, players, cardIndex, deck)
        }
    }
    else if (!shielded)
        target.damage(1)

    target.underFire = false

    // Add checks for if a Blackened or Spotless get eliminated.
    
}

class Game {

    constructor(numPlayers) {
        this._players = this._initPlayers(numPlayers)
        this._deck = new Deck(this._initCards())

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].role.name === Roles.PROTAGONIST) {
                this.players[i].role.flip()
                this._current = i
            }

            this.players[i].draw(this.players[i].health, this.deck)
        }
    }

    _initPlayers(numPlayers) {
        let players = []
        let roles = this._initRoles(numPlayers)
        let characters = this._initCharacters(numPlayers)

        while (numPlayers > 0) {
            let roleIndex = Math.floor(Math.random() * roles.length)
            let charIndex = Math.floor(Math.random() * characters.length)
            players.push(new Player(roles[roleIndex], characters[charIndex]))
            roles.splice(roleIndex, 1)
            characters.splice(charIndex, 1)
            numPlayers -= 1
        }

        return players
    }

    _initRoles(numPlayers) {
        let roles = []

        roles.push(new RoleCard(Roles.PROTAGONIST))
        roles.push(new RoleCard(Roles.BLACKENED))
        roles.push(new RoleCard(Roles.BLACKENED))
        roles.push(new RoleCard(Roles.RENEGADE))

        if (numPlayers >= 5)
            roles.push(new RoleCard(Roles.SPOTLESS))

        if (numPlayers >= 6)
            roles.push(new RoleCard(Roles.BLACKENED))

        if (numPlayers === 7)
            roles.push(new RoleCard(Roles.SPOTLESS))

        return roles
    }

    _initCharacters(numPlayers) {
        let characters = []
        let clone = []
        const keys = Object.keys(Characters)

        for (let i = 0; i < keys.length; i ++)
            clone.push(keys[i])

        while (numPlayers > 0) {
            let randomNum = Math.floor(Math.random() * clone.length)
            let name = clone[randomNum]
            let someName = ''

            if (!name.includes('0'))
                someName = name[0] + name.toLowerCase().slice(1)
            else
                someName = 'K1-B0'

            let character = new CharacterCard(someName)
            clone.splice(randomNum, 1)
            characters.push(character)
            numPlayers -= 1
        }

        return characters
    }

    _initCards() {
        let cards = []

        const fs = require('fs')
        let data = fs.readFileSync('src/modules/classes/cards/playing_cards.txt', 'utf-8')
        let dataArray = data.split('\r\n')

        for (let i = 0; i < dataArray.length; i++)
            dataArray[i] = dataArray[i].split(', ')

        for (let i = 0; i < dataArray.length; i++) {
            let card = null

            switch (dataArray[i][2]) {
                case "Peacemaker":
                case "Pistol":
                case "Carbine":
                case "Rifle":
                case "Sniper Rifle":
                    card = new Weapon(dataArray[i][2], dataArray[i][1], dataArray[i][0])
                    break
                case "Trust":
                case "Concentration":
                case "Plot Armor":
                    card = new Skill(dataArray[i][2], dataArray[i][1], dataArray[i][0])
                    break
                case "Alibi":
                    card = new Alibi(dataArray[i][1], dataArray[i][0])
                    break
                case "Despair":
                    card = new Despair(dataArray[i][1], dataArray[i][0])
                    break
                case "Hangman's Gambit":
                    card = new HangmanGambit(dataArray[i][1], dataArray[i][0])
                    break
                case "Hope":
                    card = new Hope(dataArray[i][1], dataArray[i][0])
                    break
                case "Hot Seat":
                    card = new HotSeat(dataArray[i][1], dataArray[i][0])
                    break
                case "Nonstop Debate":
                    card = new NonstopDebate(dataArray[i][1], dataArray[i][0])
                    break
                case "Perjury":
                    card = new Perjury(dataArray[i][1], dataArray[i][0])
                    break
                case "Present":
                    card = new Present(dataArray[i][1], dataArray[i][0])
                    break
                case "Truth Bullet":
                    card = new TruthBullet(dataArray[i][1], dataArray[i][0])
                    break
            }

            cards.push(card)
        }

        return cards
    }

    get players() {
        return this._players
    }

    get deck() {
        return this._deck
    }

    currentPlayer() {
        return this._players[this._current]
    }

    toNextPlayer() {
        if (this._current + 1 === this.players.length)
            this._current = 0
        else
            this._current += 1
    }

    protagonistIsAlive() {
        for (let i = 0; i < this.players.length; i++)
            if (this.players[i].role.name === Roles.PROTAGONIST)
                return this.players[i].health.current > 0
    }

    antagonistsAreAlive() {

        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i]

            if (player.role.name === Roles.BLACKENED && player.isAlive())
                return true
            else if (player.role.name === Roles.RENEGADE && player.isAlive())
                return true
        }

        return false
    }

    start() {

        while (this.protagonistIsAlive() && this.antagonistsAreAlive()) {
            let currentPlayer = this.currentPlayer

            // Draw two cards.
            currentPlayer.draw(2, this.deck)

            // Play any number of cards.
            let choice1 = ''

            while (choice1 !== '-1') {
                cardChoicePrompt('What will you do?', choice1)

                if (choice1 !== '-1')
                    currentPlayer.play(currentPlayer, this.players, parseInt(choice1), this.deck)
            }

            currentPlayer.resetBullets()

            // Discard excess cards.
            let choice2 = ''

            while (currentPlayer.hand.length > currentPlayer.health.max) {
                cardChoicePrompt('Select a card to discard', choice2)
                currentPlayer.discardFromHand(parseInt(choice2), this.deck)
            }

            // Move onto next player.
            this.toNextPlayer()
        }

        // Check win conditions.
        if (!this.protagonistIsAlive()) {

            if (this.players.length === 1 && this.players[0].role.name === Roles.RENEGADE)
                console.log('Renegade wins!')
            else
                console.log('The Blackened win!')
        }

        else if (!this.antagonistsAreAlive())
            console.log('The Protagonists and Spotless win!')
    }
}

export { Game, processAttack, selectCardIndex, selectCardType, selectTargetIndex }