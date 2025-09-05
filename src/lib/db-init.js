import { sequelize } from '../lib/sequelize.js';
import User from '../app/api/models/user.js';
import Purchase from '../app/api/models/transaction.js';

async function ensureDb() {
  try {
    console.log('Authenticating database connection...');
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully');
    
    console.log('Syncing User model...');
    await User.sync();       // safe - creates if not exists
    console.log('User model synced successfully');
    
    console.log('Syncing Purchase model...');
    await Purchase.sync();   // safe - creates if not exists
    console.log('Purchase model synced successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export { ensureDb };
