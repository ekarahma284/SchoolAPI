import pengumumanService from "../service/pengumumanService.js";

const pengumumanController = {
  async getAll(req, res) {
    try {
      const data = await pengumumanService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await pengumumanService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const created = await pengumumanService.create(req.body);
      res.status(201).json({ message: "Pengumuman berhasil ditambahkan", pengumuman: created });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await pengumumanService.update(req.params.id, req.body);
      res.json({ message: "Pengumuman berhasil diperbarui", pengumuman: updated });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await pengumumanService.delete(req.params.id);
      res.json({ message: "Pengumuman berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default pengumumanController;
