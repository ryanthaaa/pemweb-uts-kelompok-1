const express = require('express');
const router = express.Router();

const memberController = require('../controllers/member.controller');

// READ
router.get('/members', memberController.getAllMembers);

// CREATE
router.get('/members/tambah', memberController.getCreateForm);
router.post('/members/create', memberController.createMember);

// UPDATE
router.get('/members/edit/:id', memberController.getEditForm);
router.post('/members/edit/:id', memberController.updateMember);

// DELETE
router.post('/members/delete/:id', memberController.deleteMember);

module.exports = router;