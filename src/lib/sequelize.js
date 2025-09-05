// Single Sequelize instance (re-uses your existing DB)
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nija-cars',         // nija-cars
  process.env.DB_USER || 'root',         // root
  process.env.DB_PASSWORD || 'password',     // password
  {
    host: process.env.DB_HOST || 'localhost', // localhost
    dialect: 'mysql',
    logging: false, // Disable logging for production
  }
);

export { sequelize };
