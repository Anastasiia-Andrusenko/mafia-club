import mysql from "mysql2/promise";

/**
 * Each serverless instance (Vercel) creates its own pool, so keep it small:
 * many concurrent instances x a large pool would exhaust MySQL's
 * max_connections. Override with DB_CONNECTION_LIMIT if the host allows more.
 */
const connectionLimit = Number(process.env.DB_CONNECTION_LIMIT) || 3;

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit,
  queueLimit: 0,
  maxIdle: connectionLimit,
  idleTimeout: 60000,
});
