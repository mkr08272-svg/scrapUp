const express = require('express');
const { createPickup, getMyPickups, getAvailablePickups, acceptPickup, updatePickupStatus } = require('../controllers/pickupController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All pickup routes require auth

router.post('/', createPickup);
router.get('/my', getMyPickups);
router.get('/available', getAvailablePickups);
router.put('/:id/accept', acceptPickup);
router.put('/:id/status', updatePickupStatus);

module.exports = router;
