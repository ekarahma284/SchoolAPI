import beritaRepository from "../repository/beritaRepository.js";

const beritaController = {
 async getAll(req, res) {
    try {
      const data = await beritaService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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
      const result = await beritaRepository.create(req.body);
      res.status(201).json({ message: "Berita berhasil ditambahkan", berita: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const result = await beritaRepository.update(req.params.id, req.body);
      res.json({ message: "Berita berhasil diperbarui", berita: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await beritaRepository.delete(req.params.id);
      res.json({ message: "Berita berhasil dihapus", result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default beritaController;
