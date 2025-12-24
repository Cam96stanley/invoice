const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const authController = require('../controllers/invoice');

router.post('/', protect, authController.createInvoice);
router.route('/:id').patch(protect).get(protect);
router.get('/myInvoices', protect);

module.exports = router;
