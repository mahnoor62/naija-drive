import { DataTypes } from 'sequelize';
import { sequelize } from '../../../lib/sequelize.js';

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  redeemCode: { type: DataTypes.STRING, allowNull: true },
}, { tableName: 'users' });

export default User;
