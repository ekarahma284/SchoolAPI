import galeriService from "../service/galeriService.js";

const galeriController = {
  async getAll(req, res) {
    try {
      const data = await galeriService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await galeriService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const created = await galeriService.create(req.body);
      res.status(201).json({ message: "Galeri berhasil ditambahkan", galeri: created });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await galeriService.update(req.params.id, req.body);
      res.json({ message: "Galeri berhasil diperbarui", galeri: updated });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await galeriService.delete(req.params.id);
      res.json({ message: "Galeri berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default galeriController;
