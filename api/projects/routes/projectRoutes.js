const express = require('express');
const router = express.Router();

const {getUserProject, getProjectTasks, getAllProjects} = require('../controllers/projects');

router.route('/get_user_project').post(getUserProject);
router.route('/get_all_projects').get(getAllProjects);

module.exports = router;