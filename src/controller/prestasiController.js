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
      res.status(500).json({ error: "Gagal mengambil data prestasi" });
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
      res.status(500).json({ error: "Gagal mengambil prestasi" });
    }
  }

  async create(req, res) {
    try {
      const prestasiData = {
        ...req.body,
        foto_url: req.file ? req.file.path : req.body.foto_url || null
      };
      const newPrestasi = await this.service.create(prestasiData);
      res.status(201).json(newPrestasi);
    } catch (error) {
      console.error("Error create prestasi:", error);
      if (error.message.includes("wajib diisi")) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === "User belum login!") {
        return res.status(401).json({ error: "Unauthorized: Login dulu!" });
      }
      res.status(500).json({ error: "Gagal membuat prestasi" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const prestasiData = {
        ...req.body,
        foto_url: req.file ? req.file.path : req.body.foto_url
      };
      const updatedPrestasi = await this.service.update(id, prestasiData);
      res.json(updatedPrestasi);
    } catch (error) {
      console.error("Error update prestasi:", error);
      if (error.message === "Prestasi tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden: Hanya author yang boleh edit!" });
      }
      res.status(500).json({ error: "Gagal update prestasi" });
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
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden: Hanya author yang boleh hapus!" });
      }
      res.status(500).json({ error: "Gagal menghapus prestasi" });
    }
  }
}
