const express = require('express');
const router = express.Router();

const {getUserProject, getProjectTasks} = require('../controllers/projects');

router.route('/get_user_project').post(getUserProject);

module.exports = router;