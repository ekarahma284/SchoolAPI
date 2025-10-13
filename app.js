import cors from "cors";
import express from "express";
import dsn from "./src/infra/postgres.js";
import router from "./src/domain/router.js";

const app = express();
const PORT = 5000;

global.loggedUser = null; // Global untuk auth sederhana (nanti upgrade ke JWT)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk form-data jika perlu
app.use("/api", router);

// Health check dengan DB
app.get("/", async (req, res) => {
  try {
    const result = await dsn`SELECT NOW()`;
    res.json({
      message: "✅ Server berjalan dan konek ke PostgreSQL",
      time: result[0]?.now || "Unknown" // postgres.js return array, bukan rows
    });
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    res.status(500).json({ message: "Gagal konek ke database", details: error.message });
  }
});

// Error handler global
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});

// Graceful shutdown (untuk deployment)
process.on("SIGTERM", () => {
  console.log("Server shutdown");
  process.exit(0);
});