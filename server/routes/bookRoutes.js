const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.ListBooks);
router.get('/:id', bookController.GetBook);
router.post('/', bookController.CreateBook);

module.exports = router;
