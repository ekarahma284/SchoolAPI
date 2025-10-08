import userService from "../service/userService.js";

const userController = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.register(username, password);
      res.json({ message: "Registrasi berhasil", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.login(username, password);
      res.json({ message: "Login berhasil", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async logout(req, res) {
    try {
      const msg = await userService.logout();
      res.json(msg);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async me(req, res) {
    try {
      const user = userService.getCurrentUser();
      if (!user) return res.status(401).json({ message: "Belum login" });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    const data = await userService.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await userService.getById(req.params.id);
    res.json(data);
  },

  async update(req, res) {
    const { username, password } = req.body;
    const data = await userService.update(req.params.id, username, password);
    res.json(data);
  },

  async delete(req, res) {
    await userService.delete(req.params.id);
    res.json({ message: "User berhasil dihapus" });
  }
};

export default userController;
