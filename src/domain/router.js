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


// CRUD user
router.get("/user", userController.getAll);
router.get("/user/:id", userController.getById);
router.post("/user", userController.create);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

// Auth route
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/me", userController.me);


export default router;
