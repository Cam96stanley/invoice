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
