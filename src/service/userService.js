import userRepo from "../repository/userRepo.js";

const userService = {
  async register(username, password) {
    if (!username || !password) {
      throw new Error("Username dan password wajib diisi");
    }

    if (username.length < 3) {
      throw new Error("Username minimal 3 karakter");
    }

    if (password.length < 5) {
      throw new Error("Password minimal 5 karakter");
    }

    // cek ke repo apakah username sudah dipakai
    const check = await userRepo.findByUsername(username);
    if (check) {
      throw new Error("Username sudah digunakan");
    }

    await userRepo.create({ username, password });
    return { message: "Registrasi berhasil" };
  },

  async login(username, password) {
    if (!username || !password) {
      throw new Error("Username dan password wajib diisi");
    }

    const user = await userRepo.findByUsername(username);
    if (!user) {
      throw new Error("Username tidak ditemukan");
    }

    if (user.password !== password) {
      throw new Error("Password salah");
    }

    return {
      message: "Login berhasil",
      user: { id: user.id, username: user.username },
    };
  },
};

export default userService;
