import cors from "cors";
import express from "express"
import dsn from "./src/infra/postgres.js";

const APP = express();
const APP_PORT = 5000;

APP.use(cors());
APP.use(express.json());

// Cek koneksi
APP.get('/', async (req, res) => {
    try {
      const result = await dsn.query('SELECT NOW()')
      res.json({
        message: '✅ Server berjalan dan konek ke PostgreSQL',
        time: result.rows[0].now
      });
    } catch (error) {
      console.error('❌ Error:', error);
      res.status(500).json({ message: 'Gagal konek ke database' });
    }
  });

  APP.listen(APP_PORT, () => {
    console.log("Server berhasil berjalan")
  })