const { Invoice, Item } = require('../models/Associations');

exports.create = async ({
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
}) => {
  try {
    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    const newInvoice = await Invoice.create(
      {
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
        total,
        items,
      },
      { include: [{ model: Item, as: 'items' }] }
    );
    return newInvoice;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.updateInvoice = async (invoiceId, updateData) => {
  try {
    const invoice = await Invoice.findByPk(invoiceId, {
      include: [{ model: Item, as: 'items' }],
    });
    if (!invoice) return null;

    const invoiceFields = [
      'fromEmail',
      'fromName',
      'fromStreet',
      'fromCity',
      'fromState',
      'fromZip',
      'toEmail',
      'toName',
      'toStreet',
      'toCity',
      'toState',
      'toZip',
      'description',
    ];

    invoiceFields.forEach((field) => {
      if (updateData[field] !== undefined) invoice[field] = updateData[field];
    });

    await invoice.save();

    if (updateData.items && Array.isArray(updateData.items)) {
      await Item.destroy({ where: { invoiceId } });

      const itemsWithInvoiceId = updateData.items.map((item) => ({
        ...item,
        invoiceId,
      }));
      await Item.bulkCreate(itemsWithInvoiceId);
    }

    await invoice.reload({ include: [{ model: Item, as: 'items' }] });

    return invoice;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.deleteInvoice = async (id) => {
  try {
    const deleted = await Invoice.destroy({ where: { id } });
    if (!deleted) {
      throw new Error('Invoice not found');
    }
    return deleted;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
