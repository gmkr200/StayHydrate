const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB_NAME,
});

// migration script - /backend/migrations/20240313185316-create-tables.js
// seeding script - /backend/seederd/20240313050155-seed-data
// seed data for products and categories - seedData/categories.csv, seedData/productsV2.csv

// Adding the below 2 tables using the initial migration script run
// pool.query(`
// CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     name varchar(255),
//     email varchar(255),
//     password varchar(255),
//     is_admin int DEFAULT 0, -- 0->
//     is_verified int DEFAULT 0,
// 	is_disabled int DEFAULT 0,
// 	token text,
//     last_login timestamp,
//     created_at timestamp DEFAULT CURRENT_TIMESTAMP,
//     updated_at timestamp DEFAULT CURRENT_TIMESTAMP
// )
// `);

// pool.query(`CREATE TABLE IF NOT EXISTS password_resets (
//     id SERIAL PRIMARY KEY,
// 	email varchar(255),
// 	token text,
//     created_at timestamp DEFAULT CURRENT_TIMESTAMP
// );
// `);

module.exports = pool;
