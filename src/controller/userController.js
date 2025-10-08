// import UserRepo from "../repository/userRepo.js";
import usersRepo from "../repository/userRepo.js";


const userController = {
  async getAll(req, res) {
    const data = await usersRepo.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await usersRepo.getById(req.params.id);
    res.json(data);
  },

  async create(req, res) {
    await usersRepo.create(req.body);
    res.json({ message: "users berhasil ditambahkan" });
  },

  async update(req, res) {
    await usersRepo.update(req.params.id, req.body);
    res.json({ message: "users berhasil diperbarui" });
  },

  async delete(req, res) {
    await usersRepo.delete(req.params.id);
    res.json({ message: "users berhasil dihapus" });
  },
};

export default userController;
