const ComputerModel = require('../models/computer.model');

// READ: Menampilkan daftar komputer
exports.getAllComputers = async (req, res) => {
    try {
        const computerList = await ComputerModel.getAll();

        res.render('pages/computers/index', {
            pageTitle: 'Data Komputer',
            computers: computerList, // Mengirimkan variabel 'computers' untuk EJS
            computerList,
            activePage: 'computers'
        });

    } catch (error) {
        console.error('[ERROR] getAllComputers:', error);
        res.status(500).send('Gagal mengambil data komputer.');
    }
};

// CREATE: Menampilkan form tambah
exports.getCreateForm = async (req, res) => {
    try {
        res.render('pages/computers/tambah', {
            pageTitle: 'Tambah Komputer',
            activePage: 'computers'
        });

    } catch (error) {
        console.error('[ERROR] getCreateForm:', error);
        res.status(500).send('Gagal membuka form komputer.');
    }
};

// CREATE: Menyimpan komputer baru
exports.createComputer = async (req, res) => {
    try {
        const {
            nomor_pc,
            jenis_pc,
            spesifikasi,
            status
        } = req.body;

        if (!nomor_pc) {
            return res.status(400).send('Nomor PC wajib diisi.');
        }

        await ComputerModel.create({
            nomor_pc,
            jenis_pc: jenis_pc || 'Reguler',
            spesifikasi,
            status: status || 'Tersedia'
        });

        console.log('[DATABASE] Komputer berhasil ditambahkan.');

        res.redirect('/computers');

    } catch (error) {
        console.error('[ERROR] createComputer:', error);
        res.status(500).send('Gagal menyimpan data komputer.');
    }
};

// UPDATE: Menampilkan form edit
exports.getEditForm = async (req, res) => {
    try {
        const { id } = req.params;

        const computer = await ComputerModel.getById(id);

        if (!computer) {
            return res.status(404).send('Data komputer tidak ditemukan.');
        }

        res.render('pages/computers/edit', {
            pageTitle: 'Edit Komputer',
            computer,
            activePage: 'computers'
        });

    } catch (error) {
        console.error('[ERROR] getEditForm:', error);
        res.status(500).send('Gagal membuka form edit komputer.');
    }
};

// UPDATE: Memperbarui komputer
exports.updateComputer = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nomor_pc,
            jenis_pc,
            spesifikasi,
            status
        } = req.body;

        if (!nomor_pc) {
            return res.status(400).send('Nomor PC wajib diisi.');
        }

        const result = await ComputerModel.update(id, {
            nomor_pc,
            jenis_pc,
            spesifikasi,
            status
        });

        if (result.affectedRows === 0) {
            return res.status(404).send('Data komputer tidak ditemukan.');
        }

        console.log(`[DATABASE] Komputer ID ${id} berhasil diperbarui.`);

        res.redirect('/computers');

    } catch (error) {
        console.error('[ERROR] updateComputer:', error);
        res.status(500).send('Gagal memperbarui data komputer.');
    }
};

// DELETE: Menghapus komputer
exports.deleteComputer = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ComputerModel.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Data komputer tidak ditemukan.');
        }

        console.log(`[DATABASE] Komputer ID ${id} berhasil dihapus.`);

        res.redirect('/computers');

    } catch (error) {
        console.error('[ERROR] deleteComputer:', error);
        res.status(500).send('Gagal menghapus data komputer.');
    }
};