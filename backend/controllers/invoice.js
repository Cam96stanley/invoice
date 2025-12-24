const invoiceService = require('../services/invoice');

exports.createInvoice = async (req, res) => {
  try {
    const userId = req.user.sub;

    const {
      fromEmail,
      fromName,
      fromStreet,
      fromCity,
      fromState,
      fromZip,
      toEmail,
      toName,
      toStreet,
      toCity,
      toState,
      toZip,
      description,
      items,
    } = req.body;

    const invoice = await invoiceService.create({
      userId,
      fromEmail,
      fromName,
      fromStreet,
      fromCity,
      fromState,
      fromZip,
      toEmail,
      toName,
      toStreet,
      toCity,
      toState,
      toZip,
      description,
      items,
    });
    res.status(201).json({ invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
