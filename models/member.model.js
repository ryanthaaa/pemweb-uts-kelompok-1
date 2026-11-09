const db = require('../config/database');

const MemberModel = {

    // READ: Mengambil seluruh data member
    getAll: async () => {
    const [rows] = await db.query(
        'SELECT * FROM member ORDER BY id_member DESC'
    );
    return rows;
},

    // Mengambil satu data member berdasarkan ID
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM member WHERE id_member = ?',
            [id]
        );

        return rows[0];
    },

    // Mengambil pilihan member dan komputer untuk form
    getOptions: async () => {
        const [members] = await db.query(
            'SELECT id_member, nama FROM member'
        );

        const [computers] = await db.query(
            'SELECT id_computer, nomor_pc FROM computer'
        );

        return { members, computers };
    },

    // CREATE: Menambahkan member
    create: async (data) => {
        const sql = `
            INSERT INTO member
            (nama, no_hp, saldo, tanggal_daftar)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.nama,
            data.no_hp,
            data.saldo,
            data.tanggal_daftar
        ]);

        return result;
    },

    // UPDATE: Memperbarui member
    update: async (id, data) => {
        const sql = `
            UPDATE member
            SET nama = ?,
                no_hp = ?,
                saldo = ?,
                tanggal_daftar = ?
            WHERE id_member = ?
        `;

        const [result] = await db.query(sql, [
            data.nama,
            data.no_hp,
            data.saldo,
            data.tanggal_daftar,
            id
        ]);

        return result;
    },

    // DELETE: Menghapus member
    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM member WHERE id_member = ?',
            [id]
        );

        return result;
    }
};

module.exports = MemberModel;