import userRepository from "../Repository/userRepository.js";

let currentUser = null; // user yang sedang login

const userService = {
  async register(username, password) {
    if (!username || !password) {
      throw new Error("Username dan password wajib diisi");
    }
    const existing = await userRepository.getUserByUsername(username);
    if (existing) throw new Error("Username sudah digunakan");

    return await userRepository.createUser(username, password);
  },

  async login(username, password) {
    const user = await userRepository.getUserByUsername(username);
    if (!user || user.password !== password) {
      throw new Error("Username atau password salah");
    }

    currentUser = { id: user.id, username: user.username };
    return currentUser;
  },

  async logout() {
    if (!currentUser) throw new Error("Tidak ada user yang sedang login");
    currentUser = null;
    return { message: "Logout berhasil" };
  },

  getLoggedUser() {
    if (!currentUser) throw new Error("Belum login");
    return currentUser;
  },

  getCurrentUser() {
    return currentUser;
  },

  async getAll() {
    return await userRepository.getAll();
  },

  async getById(id) {
    return await userRepository.getById(id);
  },

  async update(id, username, password) {
    return await userRepository.update(id, username, password);
  },

  async delete(id) {
    return await userRepo.delete(id);
  }
};

export default userService;
