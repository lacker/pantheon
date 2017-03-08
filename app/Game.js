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

export default class Game {
  // players is a map from id to deckname
  constructor(players, seed) {
    this.players = players;
    this.rng = seedrandom(seed);

    // See who goes first
    let playerList = Object.keys(this.players);
    if (this.rng() < 0.5) {
      this.activePlayer = playerList[0];
      this.inactivePlayer = playerList[1];
    } else {
      this.activePlayer = playerList[1];
      this.inactivePlayer = playerList[0];
    }

    // TODO: make hands and fields
  }

  // TODO: enumerate legit actions
  processAction(action) {
    // TODO: implement
  }
}
