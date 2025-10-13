import prestasiService from "../service/prestasiService.js";

const prestasiController = {
  async getAll(req, res) {
    try {
      const data = await prestasiService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await prestasiService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const created = await prestasiService.create(req.body);
      res.status(201).json({
        message: "Prestasi berhasil ditambahkan",
        prestasi: created,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await prestasiService.update(req.params.id, req.body);
      res.json({
        message: "Prestasi berhasil diperbarui",
        prestasi: updated,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await prestasiService.delete(req.params.id);
      res.json({ message: "Prestasi berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default prestasiController;
