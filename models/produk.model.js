const db = require('../config/database');

const ProdukModel = {

    // READ: Mengambil seluruh data produk
    getAll: async () => {
        const sql = `
            SELECT * FROM produk
            ORDER BY id_produk DESC
        `;

        const [rows] = await db.query(sql);
        return rows;
    },

    // Mengambil satu data produk berdasarkan ID
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM produk WHERE id_produk = ?',
            [id]
        );

        return rows[0];
    },

    // CREATE: Menambahkan produk baru
    create: async (data) => {
        const sql = `
            INSERT INTO produk
            (nama_produk, kategori, harga, stok)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori || 'Makanan',
            data.harga,
            data.stok
        ]);

        return result;
    },

    // UPDATE: Memperbarui data produk
    update: async (id, data) => {
        const sql = `
            UPDATE produk
            SET nama_produk = ?,
                kategori = ?,
                harga = ?,
                stok = ?
            WHERE id_produk = ?
        `;

        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok,
            id
        ]);

        return result;
    },

    // DELETE: Menghapus produk
    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM produk WHERE id_produk = ?',
            [id]
        );

        return result;
    }
};

module.exports = ProdukModel;