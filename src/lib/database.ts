import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nija-cars',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function savePaymentData(
  userEmail: string,
  redeemCode: string,
  paymentIntent: string,
  carId?: string,
  carName?: string,
  amount?: number
): Promise<void> {
  const connection = getPool();
  
  try {
    await connection.execute(
      `INSERT INTO payments (user_email, redeem_code, payment_intent, car_id, car_name, amount, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [userEmail, redeemCode, paymentIntent, carId || null, carName || null, amount || null]
    );
    console.log('Payment data saved successfully');
  } catch (error) {
    console.error('Error saving payment data:', error);
    throw error;
  }
}

export async function createPaymentsTable(): Promise<void> {
  const connection = getPool();
  
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        redeem_code VARCHAR(255) NOT NULL UNIQUE,
        payment_intent VARCHAR(255) NOT NULL,
        car_id VARCHAR(255),
        car_name VARCHAR(255),
        amount DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_email (user_email),
        INDEX idx_payment_intent (payment_intent),
        INDEX idx_redeem_code (redeem_code)
      )
    `);
    console.log('Payments table created or already exists');
  } catch (error) {
    console.error('Error creating payments table:', error);
    throw error;
  }
}
