import PrestasiService from "../service/prestasiService.js";

export default class PrestasiController {
  constructor() {
    this.service = new PrestasiService();
  }

  async getAll(req, res) {
    try {
      const prestasi = await this.service.getAll();
      res.json(prestasi);
    } catch (error) {
      console.error("Error getAll prestasi:", error);
      res.status(500).json({ error: "Gagal mengambil data prestasi", details: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const prestasi = await this.service.getById(id);
      res.json(prestasi);
    } catch (error) {
      console.error("Error getById prestasi:", error);
      if (error.message === "Prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal mengambil prestasi", details: error.message });
    }
  }

  async create(req, res) {
    try {
      const prestasiData = {
        ...req.body,
        foto_url: req.file ? req.file.path || req.file.originalname : req.body.foto_url || null,
      };

      const newPrestasi = await this.service.create(prestasiData);
      res.status(201).json({ message: "Prestasi berhasil ditambahkan", data: newPrestasi });
    } catch (error) {
      console.error("Error create prestasi:", error);
      if (error.message.includes("wajib diisi")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal membuat prestasi", details: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const prestasiData = {
        ...req.body,
        foto_url: req.file ? req.file.path || req.file.originalname : req.body.foto_url,
      };
      const updated = await this.service.update(id, prestasiData);
      res.json({ message: "Prestasi berhasil diperbarui", data: updated });
    } catch (error) {
      console.error("Error update prestasi:", error);
      if (error.message === "Prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal update prestasi", details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Prestasi berhasil dihapus" });
    } catch (error) {
      console.error("Error delete prestasi:", error);
      if (error.message === "Prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Gagal menghapus prestasi", details: error.message });
    }
  }
}
