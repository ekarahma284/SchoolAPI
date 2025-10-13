import express from "express";

// Import semua controller
import BeritaController from "../controller/beritaController.js";
import PrestasiController from "../controller/prestasiController.js";
import PengumumanController from "../controller/pengumumanController.js";
import GaleriController from "../controller/galeriController.js";
import UserController from "../controller/userController.js";

const router = express.Router();

// Buat instance dari masing-masing controller
const beritaController = new BeritaController();
const prestasiController = new PrestasiController();
const pengumumanController = new PengumumanController();
const galeriController = new GaleriController();
const userController = new UserController();

//
// ---------------- USER ----------------
//
router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.get("/users", userController.getAll.bind(userController));
router.get("/users/:id", userController.getById.bind(userController));
router.put("/users/:id", userController.update.bind(userController));
router.delete("/users/:id", userController.delete.bind(userController));

//
// ---------------- BERITA ----------------
//
router.get("/berita", beritaController.getAll.bind(beritaController));
router.get("/berita/:id", beritaController.getById.bind(beritaController));
router.post("/berita", beritaController.create.bind(beritaController));
router.put("/berita/:id", beritaController.update.bind(beritaController));
router.delete("/berita/:id", beritaController.delete.bind(beritaController));

//
// ---------------- PRESTASI ----------------
//
router.get("/prestasi", prestasiController.getAll.bind(prestasiController));
router.get("/prestasi/:id", prestasiController.getById.bind(prestasiController));
router.post("/prestasi", prestasiController.create.bind(prestasiController));
router.put("/prestasi/:id", prestasiController.update.bind(prestasiController));
router.delete("/prestasi/:id", prestasiController.delete.bind(prestasiController));

//
// ---------------- PENGUMUMAN ----------------
//
router.get("/pengumuman", pengumumanController.getAll.bind(pengumumanController));
router.get("/pengumuman/:id", pengumumanController.getById.bind(pengumumanController));
router.post("/pengumuman", pengumumanController.create.bind(pengumumanController));
router.put("/pengumuman/:id", pengumumanController.update.bind(pengumumanController));
router.delete("/pengumuman/:id", pengumumanController.delete.bind(pengumumanController));

//
// ---------------- GALERI ----------------
//
router.get("/galeri", galeriController.getAll.bind(galeriController));
router.get("/galeri/:id", galeriController.getById.bind(galeriController));
router.post("/galeri", galeriController.create.bind(galeriController));
router.put("/galeri/:id", galeriController.update.bind(galeriController));
router.delete("/galeri/:id", galeriController.delete.bind(galeriController));

export default router;
