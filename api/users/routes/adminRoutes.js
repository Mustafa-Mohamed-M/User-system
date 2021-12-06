const express = require('express');
const router = express.Router();

const { getAllUsers} = require('../controllers/users');


//router.route('/signup').post(signup);
router.route('/get_all_users').get(getAllUsers);


module.exports = router;