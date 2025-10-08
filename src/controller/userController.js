import userRepo from "../repository/userRepo.js";
import userService from "../service/userService.js";

const userController = {
  async getAll(req, res) {
    const data = await userRepo.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await userRepo.getById(req.params.id);
    res.json(data);
  },

  async create(req, res) {
    await userRepo.create(req.body);
    res.json({ message: "User berhasil ditambahkan" });
  },

  async update(req, res) {
    await userRepo.update(req.params.id, req.body);
    res.json({ message: "User berhasil diperbarui" });
  },

  async delete(req, res) {
    await userRepo.delete(req.params.id);
    res.json({ message: "User berhasil dihapus" });
  },

  // REGISTER
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const result = await userRepo.register(username, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // LOGIN pakai service
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await userService.login(username, password);

      // simpan id user ke session / sementara kirim balik ke client
      res.json({
        message: result.message,
        user: result.user, // id dan username dikembalikan
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};

export default userController;
