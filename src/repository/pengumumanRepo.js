const pengumumanRepo = {
    async getAll() {
        const result = await dsn.query("SELECT * FROM pengumuman ORDER BY id DESC");
        return result.rows;
    },

    async getById(id) {
        const result = await dsn.query("SELECT * FROM pengumuman WHERE id = $1", [id]);
        return result.rows[0];
    },

    async create(data) {
        const { tanggal, judul, isi, author_id } = data;
        await dsn.query(
            "INSERT INTO pengumuman (tanggal, judul, isi, author_id) VALUES($1, $2, $3, $4)",
        [tanggal, judul, isi, author_id]
        );
    },

    async update(id, data) {
        const { tanggal, judul, isi, author_id } = data;
        await dsn.query(
            "UPDATE pengumuman SET tanggal=$1, judul=$2, isi=$3, author_id=$4 WHERE id=$5",
            [tanggal, judul, isi, author_id, id]
        );
    },

    async delete(id) {
        await dsn.query("DELETE FROM pengumuman WHERE id=$1", [id]);
    },
};

export default pengumumanRepo;