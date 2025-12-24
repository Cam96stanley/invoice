const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const authController = require('../controllers/invoice');

router.post('/', protect, authController.createInvoice);
router.get('/myInvoices', protect);
router
  .route('/:id')
  .patch(protect, authController.updateInvoice)
  .delete(protect, authController.deleteInvoice);

module.exports = router;
