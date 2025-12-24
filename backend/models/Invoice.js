const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Invoice = sequelize.define(
  'Invoice',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    fromEmail: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    fromName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromStreet: {
      type: DataTypes.STRING,
    },
    fromCity: {
      type: DataTypes.STRING,
    },
    fromState: {
      type: DataTypes.STRING,
    },
    fromZip: {
      type: DataTypes.STRING,
    },
    toEmail: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    toName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toStreet: {
      type: DataTypes.STRING,
    },
    toCity: {
      type: DataTypes.STRING,
    },
    toState: {
      type: DataTypes.STRING,
    },
    toZip: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'DRAFT',
        'SENT',
        'UNPAID',
        'PAID',
        'OVERDUE',
        'CANCELED'
      ),
      defaultValue: 'DRAFT',
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

module.exports = Invoice;
