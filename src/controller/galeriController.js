// import GaleriRepo from "../repository/galeriRepo.js";
import galeriRepo from "../repository/galeriRepo.js";

const galeriController = {
  async getAll(req, res) {
    const data = await galeriRepo.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await galeriRepo.getById(req.params.id);
    res.json(data);
  },

  async create(req, res) {
    await galeriRepo.create(req.body);
    res.json({ message: "Galeri berhasil ditambahkan" });
  },

  async update(req, res) {
    await galeriRepo.update(req.params.id, req.body);
    res.json({ message: "Galeri berhasil diperbarui" });
  },

  async delete(req, res) {
    await galeriRepo.delete(req.params.id);
    res.json({ message: "Galeri berhasil dihapus" });
  },
};

export default galeriController;
