const express = require('express');
const router = express.Router();

const songController = require('../controllers/songController');

router.get('/', songController.ListSongs);
router.get('/:id', songController.GetSong);
router.post('/', songController.CreateSong);

module.exports = router;
