// import PengumumanRepo from "../repository/pengumumanRepo.js";
import pengumumanRepo from "../repository/pengumumanRepo.js";

const PengumumanController = {
  async getAll(req, res) {
    const data = await pengumumanRepo.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await pengumumanRepo.getById(req.params.id);
    res.json(data);
  },

  async create(req, res) {
    await pengumumanRepo.create(req.body);
    res.json({ message: "Pengumuman berhasil ditambahkan" });
  },

  async update(req, res) {
    await pengumumanRepo.update(req.params.id, req.body);
    res.json({ message: "Pengumuman berhasil diperbarui" });
  },

  async delete(req, res) {
    await pengumumanRepo.delete(req.params.id);
    res.json({ message: "Pengumuman berhasil dihapus" });
  },
};

export default PengumumanController;
