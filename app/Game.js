import seedrandom from 'seedrandom';

// God of the sun
const APOLLO = {
  Flare: {
    damageAllEnemies: 2,
    cost: 4,
  },
  Elemental: {
    attack: 3,
    health: 1,
    cost: 3,
  }
};

// Goddess of the hunt
const ARTEMIS = {
  Bear: {
    attack: 2,
    health: 2,
    cost: 2,
  },
  Stag: {
    attack: 3,
    health: 4,
    cost: 4,
  },
};

const DECKS = {
  Apollo: APOLLO,
  Artemis: ARTEMIS,
};

class Deck {
  constructor(name) {
    this.name = name;
    this.cards = DECKS[name];

    // The cardlist has a 'name' field on it
    this.cardlist = [];
    for (let name in this.cards) {
      let card = { ...this.cards[name], name };
      this.cardlist.push(card);
    }
  }

  // Gets a random card given a random 0-1 floating point number.
  // Adds the 'name' field to the card, too.
  // Also adds a numerical 'id'.
  random(game) {
    game.totalCards += 1;
    let index = Math.floor(game.rng() * this.cardlist.length);
    let card = {
      ...this.cardlist[index],
      id: game.totalCards,
    };
    return card;
  }
}

export default class Game {
  // players is a map from player id to deckname
  constructor(players, seed) {
    this.players = players;
    this.decks = {};
    for (let playerId in players) {
      let deckname = players[playerId];
      this.decks[playerId] = new Deck(deckname);
    }

    // The number of cards that were ever drawn
    this.totalCards = 0

    this.rng = seedrandom(seed);

    // See who goes first
    let playerList = Object.keys(this.players);
    playerList.sort();
    if (this.rng() < 0.5) {
      this.activePlayer = playerList[0];
      this.inactivePlayer = playerList[1];
    } else {
      this.activePlayer = playerList[1];
      this.inactivePlayer = playerList[0];
    }

    // hands is a map from player id to list-of-cards hand.
    // In the hand, the name is stored under the 'name' field.
    this.hands = {};
    for (let playerId of playerList) {
      let hand = [];
      for (let i = 0; i < 3; i++) {
        hand.push(this.decks[playerId].random(this));
      }
    }

    this.fields = {};
    for (let playerId of playerList) {
      this.fields[playerId] = [];
    }
  }

  randomCard(playerId) {
    return this.decks[playerId].random(this);
  }

  toggleActivePlayer() {
    let currentActive = this.activePlayer;
    let nextActive = this.inactivePlayer;
    this.activePlayer = nextActive;
    this.inactivePlayer = currentActive;
  }

  // Has the active player draw a card
  drawCard() {
    let card = this.randomCard(this.activePlayer);
    this.hands[this.activePlayer].push(card);
  }

  // Pops a card from the hand and returns it
  // Returns null if there is no such card
  handPop(playerId, cardId) {
    let newHand = [];
    let retVal = null;
    for (let card of this.hands[playerId]) {
      if (card.id === cardId) {
        retVal = card;
      } else {
        newHand.push(card);
      }
    }
    if (retVal === null) {
      return null;
    }
    this.hands[playerId] = newHand;
    return retVal;
  }

  // Legitimate actions:
  // { type: 'endTurn' }
  // TODO: more actions
  processAction(action) {
    switch(action.type) {
      case 'endTurn':
      this.toggleActivePlayer();
      this.drawCard();
      break;
      default:
      throw new Error('weird action type: ' + action.type);
    }
  }
}
