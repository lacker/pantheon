import seedrandom from 'seedrandom';

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

export default class Game {
  // player1 and player2 are just string ids for the players
  // player1 will go first
  constructor(player1, player2, seed) {
    this.playerIds = [player1, player2];
    this.turn = player1;
    this.rng = seedrandom(seed);

    // TODO: make hands and fields
  }

  // TODO: enumerate legit actions
  processAction(action) {
    // TODO: implement
  }
}
