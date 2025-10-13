import beritaRepository from "../repository/beritaRepository.js";
import beritaService from "../service/beritaService.js";


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
      const berita = await beritaService.getById(req.params.id);
      res.json(berita);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const result = await beritaService.create(req.body);
      res.status(201).json({ message: "Berita berhasil ditambahkan", berita: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const result = await beritaRepository.update(id, req.body);

      // Jika hasil update kosong (data tidak ditemukan)
      if (!result) {
        return res.status(404).json({ message: `Berita dengan ID ${id} tidak ditemukan` });
      }

      res.json({ message: "Berita berhasil diperbarui", berita: result });
    } catch (err) {
      res.status(500).json({ message: `Terjadi kesalahan: ${err.message}` });
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
