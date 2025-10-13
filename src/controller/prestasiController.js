import PrestasiService from "../service/prestasiService.js";

const service = new PrestasiService();

export default class PrestasiController {
  async getAll(req, res) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await service.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Prestasi tidak ditemukan" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = await service.create(req.body);
      res.status(201).json({ message: "Prestasi berhasil ditambahkan", data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const data = await service.update(req.params.id, req.body);
      res.json({ message: "Prestasi berhasil diperbarui", data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await service.delete(req.params.id);
      res.json({ message: "Prestasi berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
