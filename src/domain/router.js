import express from "express";
import beritaController from "../controller/beritaController.js";
import galeriController from "../controller/galeriController.js";
import pengumumanController from "../controller/pengumumanController.js";
import userController from "../controller/userController.js";
import multer from "multer";
import uploadController from "../controller/uploadController.js";
import PrestasiController from "../controller/prestasiController.js";

const router = express.Router();

// Konfigurasi multer (memory storage untuk deployment)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware auth sederhana (cek global.loggedUser dan set ke req.user)
const authMiddleware = (req, res, next) => {
  if (!global.loggedUser || !global.loggedUser.id) {
    return res.status(401).json({ error: "Unauthorized: Login dulu!" });
  }
  req.user = global.loggedUser; // Set ke req untuk kompatibilitas
  next();
};

// Route upload terpisah
router.post("/upload", upload.single("foto"), uploadController.upload);

// === USER ROUTES (tidak perlu auth kecuali /me) ===
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/me", authMiddleware, userController.me);

// === BERITA ROUTES (asumsi sama; tambah auth jika perlu) ===
router.get("/berita", beritaController.getAll);
router.get("/berita/:id", beritaController.getById);
router.post("/berita", authMiddleware, beritaController.create); // Contoh: tambah auth
router.put("/berita/:id", authMiddleware, beritaController.update);
router.delete("/berita/:id", authMiddleware, beritaController.delete);

// === GALERI ROUTES ===
router.get("/galeri", galeriController.getAll);
router.get("/galeri/:id", galeriController.getById);
router.post("/galeri", authMiddleware, galeriController.create);
router.put("/galeri/:id", authMiddleware, galeriController.update);
router.delete("/galeri/:id", authMiddleware, galeriController.delete);

// === PENGUMUMAN ROUTES ===
router.get("/pengumuman", pengumumanController.getAll);
router.get("/pengumuman/:id", pengumumanController.getById);
router.post("/pengumuman", authMiddleware, pengumumanController.create);
router.put("/pengumuman/:id", authMiddleware, pengumumanController.update);
router.delete("/pengumuman/:id", authMiddleware, pengumumanController.delete);

// === PRESTASI ROUTES ===
router.get("/prestasi", PrestasiController.getAll);
router.get("/prestasi/:id", PrestasiController.getById);
router.post("/prestasi", authMiddleware, PrestasiController.create);
router.put("/prestasi/:id", authMiddleware, PrestasiController.update);
router.delete("/prestasi/:id", authMiddleware, PrestasiController.delete);

export default router;