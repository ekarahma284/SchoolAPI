// import PrestasiRepo from "../repository/prestasiRepo.js";
import prestasiRepo from "../repository/prestasiRepo.js";


const PrestasiController = {
  async getAll(req, res) {
    const data = await prestasiRepo.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await prestasiRepo.getById(req.params.id);
    res.json(data);
  },

  async create(req, res) {
    await prestasiRepo.create(req.body);
    res.json({ message: "Prestasi berhasil ditambahkan" });
  },

  async update(req, res) {
    await prestasiRepo.update(req.params.id, req.body);
    res.json({ message: "Prestasi berhasil diperbarui" });
  },

  async delete(req, res) {
    await prestasiRepo.delete(req.params.id);
    res.json({ message: "Prestasi berhasil dihapus" });
  },
};

export default PrestasiController;
