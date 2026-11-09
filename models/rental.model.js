
const db = require('../config/database');

const RentalModel = {

    // READ: Mengambil seluruh data rental
    getAll: async () => {
        const sql = `
            SELECT
                rental.*,
                member.nama AS nama_member,
                computer.nomor_pc
            FROM rental
            LEFT JOIN member
                ON rental.id_member = member.id_member
            INNER JOIN computer
                ON rental.id_computer = computer.id_computer
            ORDER BY rental.id_rental DESC
        `;

        const [rows] = await db.query(sql);
        return rows;
    },

    // Mengambil satu data rental berdasarkan ID
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM rental WHERE id_rental = ?',
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

    // CREATE: Menambahkan rental
    create: async (data) => {
        const sql = `
            INSERT INTO rental
            (id_member, id_computer, waktu_mulai, waktu_selesai, total_biaya)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.id_member || null,
            data.id_computer,
            data.waktu_mulai,
            data.waktu_selesai || null,
            data.total_biaya ?? null
        ]);

        return result;
    },

    // UPDATE: Memperbarui rental
    update: async (id, data) => {
        const sql = `
            UPDATE rental
            SET id_member = ?,
                id_computer = ?,
                waktu_mulai = ?,
                waktu_selesai = ?,
                total_biaya = ?
            WHERE id_rental = ?
        `;

        const [result] = await db.query(sql, [
            data.id_member || null,
            data.id_computer,
            data.waktu_mulai,
            data.waktu_selesai || null,
            data.total_biaya ?? null,
            id
        ]);

        return result;
    },

    // DELETE: Menghapus rental
    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM rental WHERE id_rental = ?',
            [id]
        );

        return result;
    }
};

module.exports = RentalModel;