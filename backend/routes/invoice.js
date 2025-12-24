const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const authController = require('../controllers/invoice');

router
  .route('/')
  .post(protect, authController.createInvoice)
  .get(protect, authController.getMyInvoices);
router
  .route('/:id')
  .patch(protect, authController.updateInvoice)
  .get(protect, authController.getInvoice)
  .delete(protect, authController.deleteInvoice);

module.exports = router;
