const express = require('express');
const router = express.Router();
const isAdminAuth = require('./../middleware/isAdmin');

const { getUserProject, getProjectTasks, getAllProjects, saveProject, 
	assignUserProject, addTaskToProject, assignUserTask, getUserTasks,
	getUserTasksPaginated } = require('../controllers/projects');

router.route('/get_user_project').post(getUserProject);
router.route('/get_user_tasks').get(getUserTasks);
router.route('/get_user_tasks_paginated').get(getUserTasksPaginated);
router.route('/assign_user_project', isAdminAuth).post(assignUserProject);
router.route('/get_all_projects').get(getAllProjects);
router.route('/save_project', isAdminAuth).post(saveProject);
router.route('/get_project_tasks/:project_id').get(getProjectTasks);
router.route('/save_task', isAdminAuth).post(addTaskToProject);
router.route('/assign_user_task', isAdminAuth).post(assignUserTask);

module.exports = router;