const express = require('express');
const router = express.Router();
const { getCart, addItem, updateItem, removeItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/', protect, addItem);
router.put('/', protect, updateItem);
router.delete('/:productId', protect, removeItem);

module.exports = router;
