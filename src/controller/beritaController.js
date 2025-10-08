import beritaService from "../service/beritaService.js";

const beritaController = {
  async getAll(req, res) {
    const data = await beritaService.getAll();
    res.json(data);
  },

  async getById(req, res) {
    try {
      const data = await beritaService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      await beritaService.create(req.body);
      res.json({ message: "Berita berhasil ditambahkan" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    await beritaService.update(req.params.id, req.body);
    res.json({ message: "Berita berhasil diperbarui" });
  },

  async delete(req, res) {
    await beritaService.delete(req.params.id);
    res.json({ message: "Berita berhasil dihapus" });
  },
};

export default beritaController;
