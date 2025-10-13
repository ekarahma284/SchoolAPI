import userService from "../service/userService.js";

const userController = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.register(username, password);
      res.status(201).json({ message: "Registrasi berhasil", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.login(username, password);

      global.loggedUser = user;
      
      res.json({ message: "Login berhasil", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async logout(req, res) {
    try {
      global.loggedUser = null;
      res.json({ message: "Berhasil logout" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async me(req, res) {
    try {
      // ✅ Gunakan req.user dari middleware (sudah di-set oleh authMiddleware)
      if (!req.user) {
        return res.status(401).json({ message: "Belum login" });
      }
      res.json(req.user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await userService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await userService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { username, password } = req.body;
      const data = await userService.update(req.params.id, username, password);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await userService.delete(req.params.id);
      res.json({ message: "User berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

export default userController;