const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const protect = require('../middleware/auth');

router.get('/', protect, userController.findAllUsers);
router.get('/me', protect, userController.getMe);

module.exports = router;
