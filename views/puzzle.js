function init(gameState) {
  const puzzleContainer = document.getElementById('puzzle-container');
  const puzzle = puzzleContainer.querySelector('.puzzle');
  const pieces = puzzle.querySelectorAll('.puzzle-piece');
  const shuffleButton = document.getElementById('shuffle-button');

  setGameState(gameState);

  pieces.forEach(piece => {
    piece.addEventListener('click', () => {
      const index = piece.dataset.index;
      if (canMove(index)) {
        movePiece(index);
        if (checkWin()) {
          alert('You win!');
        }
      }
    });
  });


  shuffleButton.addEventListener('click', shufflePieces);
}
function shuffleTiles() {
  for (var i = gameState.tiles.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = gameState.tiles[i].value;
    gameState.tiles[i].value = gameState.tiles[j].value;
    gameState.tiles[j].value = temp;
  }
}
var shuffleButton = document.getElementById('shuffle-button');
shuffleButton.addEventListener('click', function() {
  shuffleTiles();
  renderTiles();
});
