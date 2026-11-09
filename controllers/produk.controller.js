const ProdukModel = require('../models/produk.model');

// READ: Menampilkan daftar produk
exports.getAllProducts = async (req, res) => {
    try {
        const produkList = await ProdukModel.getAll();

        res.render('pages/produk/index', {
            pageTitle: 'Data Produk',
            produkList,
            activePage: 'products' // Sesuaikan activePage ke 'products'
        });

    } catch (error) {
        console.error('[ERROR] getAllProducts:', error);
        res.status(500).send('Gagal mengambil data produk: ' + error.message);
    }
};

// CREATE: Menampilkan form tambah produk
exports.getCreateForm = async (req, res) => {
    try {
        res.render('pages/produk/tambah', {
            pageTitle: 'Tambah Produk',
            activePage: 'products'
        });

    } catch (error) {
        console.error('[ERROR] getCreateForm:', error);
        res.status(500).send('Gagal membuka form produk: ' + error.message);
    }
};

// CREATE: Menyimpan produk baru
exports.createProduct = async (req, res) => {
    try {
        const { nama_produk, kategori, harga, stok } = req.body;

        if (!nama_produk || harga === undefined || stok === undefined) {
            return res.status(400).send('Nama produk, harga, dan stok wajib diisi.');
        }

        await ProdukModel.create({
            nama_produk,
            kategori: kategori || 'Makanan',
            harga,
            stok
        });

        console.log('[DATABASE] Produk berhasil ditambahkan.');
        res.redirect('/products'); // Redirect ke /products

    } catch (error) {
        console.error('[ERROR] createProduct:', error);
        res.status(500).send('Gagal menyimpan data produk: ' + error.message);
    }
};

// UPDATE: Menampilkan form edit produk
exports.getEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        const produk = await ProdukModel.getById(id);

        if (!produk) {
            return res.status(404).send('Data produk tidak ditemukan.');
        }

        res.render('pages/produk/edit', {
            pageTitle: 'Edit Produk',
            produk,
            activePage: 'products'
        });

    } catch (error) {
        console.error('[ERROR] getEditForm:', error);
        res.status(500).send('Gagal membuka form edit produk: ' + error.message);
    }
};

// UPDATE: Memperbarui produk
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_produk, kategori, harga, stok } = req.body;

        if (!nama_produk || harga === undefined || stok === undefined) {
            return res.status(400).send('Nama produk, harga, dan stok wajib diisi.');
        }

        const result = await ProdukModel.update(id, {
            nama_produk,
            kategori,
            harga,
            stok
        });

        if (result.affectedRows === 0) {
            return res.status(404).send('Data produk tidak ditemukan.');
        }

        console.log(`[DATABASE] Produk ID ${id} berhasil diperbarui.`);
        res.redirect('/products'); // Redirect ke /products

    } catch (error) {
        console.error('[ERROR] updateProduct:', error);
        res.status(500).send('Gagal memperbarui data produk: ' + error.message);
    }
};

// DELETE: Menghapus produk
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProdukModel.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Data produk tidak ditemukan.');
        }

        console.log(`[DATABASE] Produk ID ${id} berhasil dihapus.`);
        res.redirect('/products'); // Redirect ke /products

    } catch (error) {
        console.error('[ERROR] deleteProduct:', error);
        res.status(500).send('Gagal menghapus data produk: ' + error.message);
    }
};