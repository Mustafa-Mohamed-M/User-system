const express = require('express');
const router = express.Router();

const {login, signup, verify, adminLogin} = require('../controllers/users');
router.route('/admin/login').post(adminLogin);
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/verify').post(verify);


module.exports = router;