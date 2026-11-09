const db = require('../config/database');

const ComputerModel = {

    // READ: Mengambil seluruh data komputer
    getAll: async () => {
        const sql = `
            SELECT *
            FROM computer
            ORDER BY id_computer DESC
        `;

        const [rows] = await db.query(sql);
        return rows;
    },

    // Mengambil satu data komputer berdasarkan ID
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM computer WHERE id_computer = ?',
            [id]
        );

        return rows[0];
    },

    // CREATE: Menambahkan komputer baru
    create: async (data) => {
        const sql = `
            INSERT INTO computer
            (nomor_pc, spesifikasi, tarif_per_jam, status)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.nomor_pc,
            data.spesifikasi || null,
            data.tarif_per_jam || 0,
            data.status || 'Tersedia'
        ]);

        return result;
    },

    // UPDATE: Memperbarui data komputer
    update: async (id, data) => {
        const sql = `
            UPDATE computer
            SET nomor_pc = ?,
                jenis_pc = ?,
                spesifikasi = ?,
                status = ?
            WHERE id_computer = ?
        `;

        const [result] = await db.query(sql, [
            data.nomor_pc,
            data.jenis_pc,
            data.spesifikasi,
            data.status,
            id
        ]);

        return result;
    },

    // UPDATE STATUS: Memperbarui status komputer (misal: 'Tersedia', 'Digunakan', 'Maintenance')
    updateStatus: async (id, status) => {
        const sql = `
            UPDATE computer
            SET status = ?
            WHERE id_computer = ?
        `;

        const [result] = await db.query(sql, [status, id]);
        return result;
    },

    // DELETE: Menghapus data komputer
    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM computer WHERE id_computer = ?',
            [id]
        );

        return result;
    }
};

module.exports = ComputerModel;