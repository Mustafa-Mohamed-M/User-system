const express = require('express');
const router = express.Router();

const {login, signup, verify} = require('../controllers/users');
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/verify').post(verify);


module.exports = router;