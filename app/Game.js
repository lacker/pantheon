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
  random(float) {
    return this.cardlist[Math.floor(float * this.cardlist.length)];
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
        hand.push(this.decks[playerId].random(this.rng()));
      }
    }
  }

  randomCard(player) {
    // TODO: implement
  }

  // TODO: enumerate legit actions
  processAction(action) {
    // TODO: implement
  }
}
