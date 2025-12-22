const User = require('./User');
const Invoice = require('./Invoice');
const Item = require('./Item');

User.hasMany(Invoice, { foreignKey: 'userId', as: 'invoices' });
Invoice.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Invoice.hasMany(Item, { foreignKey: 'invoiceId', as: 'items' });
Item.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });

module.exports = { User, Invoice, Item };
