import express from "express";
import beritaController from "../controller/beritaController.js";
import galeriController from "../controller/galeriController.js";
import pengumumanController from "../controller/pengumumanController.js";
import prestasiController from "../controller/prestasiController.js";
import userController from "../controller/userController.js";

const router = express.Router();


// CRUD BERITA

router.get("/berita", beritaController.getAll);
router.get("/berita/:id", beritaController.getById);
router.post("/berita", beritaController.create);
router.put("/berita/:id", beritaController.update);
router.delete("/berita/:id", beritaController.delete);


// CRUD GALERI

router.get("/galeri", galeriController.getAll);
router.get("/galeri/:id", galeriController.getById);
router.post("/galeri", galeriController.create);
router.put("/galeri/:id", galeriController.update);
router.delete("/galeri/:id", galeriController.delete);


// CRUD PENGUMUMAN

router.get("/pengumuman", pengumumanController.getAll);
router.get("/pengumuman/:id", pengumumanController.getById);
router.post("/pengumuman", pengumumanController.create);
router.put("/pengumuman/:id", pengumumanController.update);
router.delete("/pengumuman/:id", pengumumanController.delete);


// CRUD PRESTASI

router.get("/prestasi", prestasiController.getAll);
router.get("/prestasi/:id", prestasiController.getById);
router.post("/prestasi", prestasiController.create);
router.put("/prestasi/:id", prestasiController.update);
router.delete("/prestasi/:id", prestasiController.delete);


// CRUD USERS

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

// AUTH
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
