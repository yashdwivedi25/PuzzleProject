const express = require('express');
const router = express.Router();

const gameService = require('../services/game-service');
const gameState = {
    tiles: [
      { value: '1' },
      { value: '2' },
      { value: '3' },
      { value: '4' },
      { value: '5' },
      { value: '6' },
      { value: '7' },
      { value: '8' },
      { value: '' },
    ],
    isGameOver: false,
  };
 


router.get('/game-state', (req, res) => {
  const gameState = gameService.getGameState();
  res.json(gameState);
});


router.post('/shuffle', (req, res) => {
  gameService.shuffleTiles();
  const gameState = gameService.getGameState();
  res.json(gameState);
});


router.post('/move', (req, res) => {
  const index = req.body.index;
  gameService.moveTile(index);
  const gameState = gameService.getGameState();
  res.json(gameState);
});

module.exports = router;

router.get('/admin', async (req, res) => {
    try {
    
      const numGames = await Game.countDocuments();
  

      const avgScore = await Game.aggregate([
        { $group: { _id: null, avgScore: { $avg: "$score" } } }
      ]);
  
  
      res.render('admin', { numGames, avgScore: avgScore[0].avgScore });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  router.post('/analytics', async (req, res) => {
    try {
      const { startTime, endTime, numMoves } = req.body;
  
      
      const duration = (endTime - startTime) / 1000;
  
    
      await Game.create({
        duration,
        numMoves,
        score: Math.round(100000 / (duration + numMoves))
      });
  
      res.status(200).send('Analytics data received');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

router.get('/', (req, res) => {
  res.render('puzzle');
});

router.get('/puzzle', (req, res) => {
  res.render('puzzle');
});
router.get('/register', (req, res) => {
    res.render('register');
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });
  
 
  

module.exports = router;
