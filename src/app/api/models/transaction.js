import { DataTypes } from 'sequelize';
import { sequelize } from '../../../lib/sequelize.js';
import User from './user.js';

const Purchase = sequelize.define('transaction', {
  paymentIntent: { type: DataTypes.STRING, allowNull: false, unique: true },
  redeemCode:    { type: DataTypes.STRING(6), allowNull: false, unique: true },
  sessionId:     { type: DataTypes.STRING, allowNull: true },
  metadata:      { type: DataTypes.JSON, allowNull: true },
}, { tableName: 'transactions' });

User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

export default Purchase;
