const shuffle = require('lodash/shuffle');

let gameState = {
  tiles: [
    { value: 1, x: 0, y: 0 },
    { value: 2, x: 1, y: 0 },
    { value: 3, x: 2, y: 0 },
    { value: 4, x: 0, y: 1 },
    { value: 5, x: 1, y: 1 },
    { value: 6, x: 2, y: 1 },
    { value: 7, x: 0, y: 2 },
    { value: 8, x: 1, y: 2 },
    { value: 9, x: 2, y: 2 }
  ]
};

function getTileByIndex(index) {
  return gameState.tiles.find(tile => tile.x * 3 + tile.y === index);
}

function getGameState() {
  return gameState;
}

function shuffleTiles() {
  gameState.tiles = shuffle(gameState.tiles);
}

function moveTile(index) {
  const tile = getTileByIndex(index);
  const adjacentTiles = getAdjacentTiles(tile);
  const emptyTile = adjacentTiles.find(tile => tile.value === 9);

  if (emptyTile) {
    const temp = { x: tile.x, y: tile.y };
    tile.x = emptyTile.x;
    tile.y = emptyTile.y;
    emptyTile.x = temp.x;
    emptyTile.y = temp.y;
  }
}

function getAdjacentTiles(tile) {
  const adjacentTiles = [];
  if (tile.x > 0) {
    adjacentTiles.push(getTileByIndex((tile.x - 1) * 3 + tile.y));
  }

  if (tile.x < 2) {
    adjacentTiles.push(getTileByIndex((tile.x + 1) * 3 + tile.y));
  }

  if (tile.y > 0) {
    adjacentTiles.push(getTileByIndex(tile.x * 3 + tile.y - 1));
  }

  if (tile.y < 2) {
    adjacentTiles.push(getTileByIndex(tile.x * 3 + tile.y + 1));
  }

  return adjacentTiles;
}

module.exports = {
  getGameState,
  shuffleTiles,
  moveTile
};

 
