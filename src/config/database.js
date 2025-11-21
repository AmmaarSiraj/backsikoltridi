// src/config/database.js
const mysql = require('mysql2/promise');

// Membuat koneksi pool ke database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Coba koneksi saat aplikasi pertama kali berjalan
pool.getConnection()
  .then(connection => {
    console.log('Berhasil terhubung ke database!');
    connection.release(); // Melepas koneksi kembali ke pool
  })
  .catch(err => {
    console.error('Gagal terhubung ke database:', err);
  });

module.exports = pool;