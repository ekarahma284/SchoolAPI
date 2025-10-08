// import beritaRepo from "../repository/beritaRepo.js";
import beritaRepo from "../repository/beritaRepo.js";

const beritaController = {
  async getAll(req, res) {
    const data = await beritaRepo.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await beritaRepo.getById(req.params.id);
    res.json(data);
  },

  async create(req, res) {
    await beritaRepo.create(req.body);
    res.json({ message: "Berita berhasil ditambahkan" });
  },

  async update(req, res) {
    await beritaRepo.update(req.params.id, req.body);
    res.json({ message: "Berita berhasil diperbarui" });
  },

  async delete(req, res) {
    await beritaRepo.delete(req.params.id);
    res.json({ message: "Berita berhasil dihapus" });
  },
};

export default beritaController;
