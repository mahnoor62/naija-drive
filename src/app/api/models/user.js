const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../lib/sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  redeemCode: { type: DataTypes.STRING, allowNull: true },
}, { tableName: 'users' });

module.exports = User;
