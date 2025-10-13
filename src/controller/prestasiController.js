import PrestasiRepository from "../repository/prestasiRepository.js"; // Sesuaikan path jika berbeda
// import authMiddleware from "../middleware/auth.js"; // Placeholder; ganti jika ada auth

const repository = new PrestasiRepository();

export default {
  async getAll(req, res) {
    try {
      const prestasi = await repository.getAll();
      res.json(prestasi);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data prestasi" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const prestasi = await repository.getById(id);
      if (!prestasi) {
        return res.status(404).json({ error: "Prestasi tidak ditemukan" });
      }
      res.json(prestasi);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil prestasi" });
    }
  },

  async create(req, res) {
    try {
      // Asumsi auth: ambil user_id dari token
      const authorId = req.user?.id; // Dari middleware auth
      if (!authorId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const prestasiData = {
        ...req.body,
        author_id: authorId,
        foto_url: req.file ? req.file.path : null // Jika upload terintegrasi
      };

      const newPrestasi = await repository.create(prestasiData);
      res.status(201).json(newPrestasi);
    } catch (error) {
      res.status(500).json({ error: "Gagal membuat prestasi" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const existing = await repository.getById(id);
      if (!existing) {
        return res.status(404).json({ error: "Prestasi tidak ditemukan" });
      }

      // Cek auth: hanya author atau admin
      if (existing.author_id !== req.user?.id) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updatedPrestasi = await repository.update(id, req.body);
      res.json(updatedPrestasi);
    } catch (error) {
      res.status(500).json({ error: "Gagal update prestasi" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await repository.getById(id);
      if (!existing) {
        return res.status(404).json({ error: "Prestasi tidak ditemukan" });
      }

      // Cek auth
      if (existing.author_id !== req.user?.id) {
        return res.status(403).json({ error: "Forbidden" });
      }

      await repository.delete(id);
      res.json({ message: "Prestasi dihapus" });
    } catch (error) {
      res.status(500).json({ error: "Gagal menghapus prestasi" });
    }
  }
};