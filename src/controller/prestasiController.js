import BeritaService from "../service/beritaService.js";

export default class BeritaController {
  static async getAll(req, res) {
    try {
      const berita = await BeritaService.getAll();
      res.json(berita);
    } catch (error) {
      console.error("Error getAll berita:", error);
      res.status(500).json({ error: "Gagal mengambil data berita" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const berita = await BeritaService.getById(id);
      res.json(berita);
    } catch (error) {
      console.error("Error getById berita:", error);
      if (error.message === "Berita tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal mengambil berita" });
    }
  }

  static async create(req, res) {
    try {
      const beritaData = {
        ...req.body,
        foto_url: req.file ? req.file.path : req.body.foto_url || null,
        author_id: req.user?.id || 1
      };
      const newBerita = await BeritaService.create(beritaData);
      res.status(201).json(newBerita);
    } catch (error) {
      console.error("Error create berita:", error);
      if (error.message.includes("wajib diisi")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal membuat berita" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const beritaData = {
        ...req.body,
        foto_url: req.file ? req.file.path : req.body.foto_url
      };
      const updatedBerita = await BeritaService.update(id, beritaData);
      res.json(updatedBerita);
    } catch (error) {
      console.error("Error update berita:", error);
      if (error.message === "Berita tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal update berita" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await BeritaService.delete(id);
      res.json({ message: "Berita berhasil dihapus" });
    } catch (error) {
      console.error("Error delete berita:", error);
      if (error.message === "Berita tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal menghapus berita" });
    }
  }
}