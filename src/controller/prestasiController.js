import PrestasiService from "../service/prestasiService.js";

export default class PrestasiController {
  static async getAll(req, res) {
    try {
      const prestasi = await PrestasiService.getAll();
      res.json(prestasi);
    } catch (error) {
      console.error("Error getAll prestasi:", error);
      res.status(500).json({ error: "Gagal mengambil data prestasi" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const prestasi = await PrestasiService.getById(id);
      res.json(prestasi);
    } catch (error) {
      console.error("Error getById prestasi:", error);
      if (error.message === "prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal mengambil prestasi" });
    }
  }

  static async create(req, res) {
    try {
      const prestasiData = {
        ...req.body,
        foto_url: req.file ? req.file.path : req.body.foto_url || null,
        author_id: req.user?.id || 1
      };
      const newPrestasi = await PrestasiService.create(prestasiData);
      res.status(201).json(newPrestasi);
    } catch (error) {
      console.error("Error create prestasi:", error);
      if (error.message.includes("wajib diisi")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal membuat prestasi" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const prestasiData = {
        ...req.body,
        foto_url: req.file ? req.file.path : req.body.foto_url
      };
      const updatedPrestasi = await PrestasiService.update(id, prestasiData);
      res.json(updatedPrestasi);
    } catch (error) {
      console.error("Error update prestasi:", error);
      if (error.message === "prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal update prestasi" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await PrestasiService.delete(id);
      res.json({ message: "Prestasi berhasil dihapus" });
    } catch (error) {
      console.error("Error delete prestasi:", error);
      if (error.message === "prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal menghapus prestasi" });
    }
  }
}