
let startTime, endTime;


let numMoves = 0;


document.addEventListener('DOMContentLoaded', () => {
  startTime = new Date();
});


document.addEventListener('puzzle-solved', () => {
  numMoves = game.getNumMoves();
  endTime = new Date();

  
  fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      startTime,
      endTime,
      numMoves
    })
  });
});
