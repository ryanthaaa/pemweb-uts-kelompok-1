
const RentalModel = require('../models/rental.model');

// READ: Menampilkan daftar rental
exports.getAllRentals = async (req, res) => {
    try {
        const rentalList = await RentalModel.getAll();

        res.render('pages/rentals/index', {
            pageTitle: 'Data Rental',
            rentalList,
            activePage: 'rentals'
        });

    } catch (error) {
        console.error('[ERROR] getAllRentals:', error);
        res.status(500).send('Gagal mengambil data rental.');
    }
};


// CREATE: Menampilkan form tambah
exports.getCreateForm = async (req, res) => {
    try {
        const { members, computers } = await RentalModel.getOptions();

        res.render('pages/rentals/tambah', {
            pageTitle: 'Tambah Rental',
            members,
            computers,
            activePage: 'rentals'
        });

    } catch (error) {
        console.error('[ERROR] getCreateForm:', error);
        res.status(500).send('Gagal membuka form rental.');
    }
};


// CREATE: Menyimpan rental baru
exports.createRental = async (req, res) => {
    try {
        const {
            id_member,
            id_computer,
            waktu_mulai,
            waktu_selesai,
            total_biaya
        } = req.body;

        if (!id_computer || !waktu_mulai) {
            return res.status(400).send('Komputer dan waktu mulai wajib diisi.');
        }

        await RentalModel.create({
            id_member,
            id_computer,
            waktu_mulai,
            waktu_selesai,
            total_biaya
        });

        console.log('[DATABASE] Rental berhasil ditambahkan.');

        res.redirect('/rentals');

    } catch (error) {
        console.error('[ERROR] createRental:', error);
        res.status(500).send('Gagal menyimpan data rental.');
    }
};


// UPDATE: Menampilkan form edit
exports.getEditForm = async (req, res) => {
    try {
        const { id } = req.params;

        const rental = await RentalModel.getById(id);

        if (!rental) {
            return res.status(404).send('Data rental tidak ditemukan.');
        }

        const { members, computers } = await RentalModel.getOptions();

        res.render('pages/rentals/edit', {
            pageTitle: 'Edit Rental',
            rental,
            members,
            computers,
            activePage: 'rentals'
        });

    } catch (error) {
        console.error('[ERROR] getEditForm:', error);
        res.status(500).send('Gagal membuka form edit rental.');
    }
};


// UPDATE: Memperbarui rental
exports.updateRental = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            id_member,
            id_computer,
            waktu_mulai,
            waktu_selesai,
            total_biaya
        } = req.body;

        if (!id_computer || !waktu_mulai) {
            return res.status(400).send('Komputer dan waktu mulai wajib diisi.');
        }

        const result = await RentalModel.update(id, {
            id_member,
            id_computer,
            waktu_mulai,
            waktu_selesai,
            total_biaya
        });

        if (result.affectedRows === 0) {
            return res.status(404).send('Data rental tidak ditemukan.');
        }

        console.log(`[DATABASE] Rental ID ${id} berhasil diperbarui.`);

        res.redirect('/rentals');

    } catch (error) {
        console.error('[ERROR] updateRental:', error);
        res.status(500).send('Gagal memperbarui data rental.');
    }
};


// DELETE: Menghapus rental
exports.deleteRental = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await RentalModel.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Data rental tidak ditemukan.');
        }

        console.log(`[DATABASE] Rental ID ${id} berhasil dihapus.`);

        res.redirect('/rentals');

    } catch (error) {
        console.error('[ERROR] deleteRental:', error);
        res.status(500).send('Gagal menghapus data rental.');
    }
};