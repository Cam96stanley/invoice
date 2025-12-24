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

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedInvoice = await invoiceService.updateInvoice(id, {
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

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ data: updatedInvoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    await invoiceService.deleteInvoice(id);
    res.status(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
