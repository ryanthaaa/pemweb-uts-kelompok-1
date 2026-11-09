const MemberModel = require('../models/member.model');

// READ: Menampilkan daftar member
exports.getAllMembers = async (req, res) => {
    try {
        const memberList = await MemberModel.getAll();

        res.render('pages/members/index', {
            pageTitle: 'Data Member',
            memberList,
            activePage: 'members'
        });

    } catch (error) {
        console.error('[ERROR] getAllMembers:', error);
        res.status(500).send('Gagal mengambil data member.');
    }
};


// CREATE: Menampilkan form tambah
exports.getCreateForm = async (req, res) => {
    try {
        const { members, computers } = await MemberModel.getOptions();

        res.render('pages/members/tambah', {
            pageTitle: 'Tambah Member',
            members,
            computers,
            activePage: 'members'
        });

    } catch (error) {
        console.error('[ERROR] getCreateForm:', error);
        res.status(500).send('Gagal membuka form member.');
    }
};


// CREATE: Menyimpan member baru
exports.createMember = async (req, res) => {
    try {
        const {
            nama,
            no_hp,
            saldo,
            tanggal_daftar
        } = req.body;

        if (!nama || !no_hp) {
            return res.status(400).send('Nama dan No HP wajib diisi.');
        }

        await MemberModel.create({
            nama,
            no_hp,
            saldo,
            tanggal_daftar
        });

        console.log('[DATABASE] Member berhasil ditambahkan.');

        res.redirect('/members');

    } catch (error) {
        console.error('[ERROR] createMember:', error);
        res.status(500).send('Gagal menyimpan data member.');
    }
};


// UPDATE: Menampilkan form edit
exports.getEditForm = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await MemberModel.getById(id);

        if (!member) {
            return res.status(404).send('Data member tidak ditemukan.');
        }

        const { members, computers } = await MemberModel.getOptions();

        res.render('pages/members/edit', {
            pageTitle: 'Edit Member',
            member,
            members,
            computers,
            activePage: 'members'
        });

    } catch (error) {
        console.error('[ERROR] getEditForm:', error);
        res.status(500).send('Gagal membuka form edit member.');
    }
};


// UPDATE: Memperbarui member
exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nama,
            no_hp,
            saldo,
            tanggal_daftar
        } = req.body;

        if (!nama || !no_hp) {
            return res.status(400).send('Nama dan No HP wajib diisi.');
        }

        const result = await MemberModel.update(id, {
            nama,
            no_hp,
            saldo,
            tanggal_daftar
        });

        if (result.affectedRows === 0) {
            return res.status(404).send('Data member tidak ditemukan.');
        }

        console.log(`[DATABASE] Member ID ${id} berhasil diperbarui.`);

        res.redirect('/members');

    } catch (error) {
        console.error('[ERROR] updateMember:', error);
        res.status(500).send('Gagal memperbarui data member.');
    }
};


// DELETE: Menghapus member
exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await MemberModel.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Data member tidak ditemukan.');
        }

        console.log(`[DATABASE] Member ID ${id} berhasil dihapus.`);

        res.redirect('/members');

    } catch (error) {
        console.error('[ERROR] deleteMember:', error);
        res.status(500).send('Gagal menghapus data member.');
    }
};