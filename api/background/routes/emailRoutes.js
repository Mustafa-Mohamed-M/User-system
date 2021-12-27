const express = require('express');

const router = express.Router();

const {sendRegistration, sendProjectAssigned, sendTaskAssigned} = require('../controllers/sendEmail');

router.route('/registration_email').post(sendRegistration);
router.route('/assigned_project').post(sendProjectAssigned);
router.route('/assigned_task').post(sendTaskAssigned);

module.exports = router;