const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.get('/', movieController.ListMovies);
router.get('/:id', movieController.GetMovie);
router.post('/', movieController.CreateMovie);

module.exports = router;
