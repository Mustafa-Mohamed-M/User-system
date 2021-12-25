require('dotenv').config();
const dbConfig = require("../database/config"); //database configuration
const sql = require("mssql"); //SQL Server

//get the projects of a particular user
exports.getUserProject = (req, res) => {
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, parseInt(req.user.id))
            .execute('getUserProject');
    }).then((result, err) => {
        if (err) {
            // console.log(err);
            res.status(500).send('Internal server error.');
        } else {
            let project = {};
            if (result.recordset.length === 1) {
                const { id, name, description } = result.recordset[0];
                project['id'] = id;
                project['name'] = name;
                project['description'] = description;
            }
            res.json(project);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send('Internal server error.');
    })
};


//get all projects in the database in a paginated manner
exports.getAllProjectsPaginated = (req, res)=>{
    let {page, limit} = req.query;
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .input('PageNumber', sql.Int, parseInt(page))
            .input('RowCount', sql.Int, parseInt(limit))
            .output('TotalProjects', sql.Int)
            .execute('getAllProjectsPaginated');
    }).then((result, err) => {
        if (err) {
            res.status(500).send('Internal server error.');
        } else {
            //send the projects as json
            let projects = [];
            for (let i = 0; i < result.recordset.length; i++) {
                projects.push({
                    id: result.recordset[i].id,
                    name: result.recordset[i].name,
                    description: result.recordset[i].description,
                    assigned: result.recordset[i].assigned,
                    user_id: result.recordset[i].user_id,
                    tasks: result.recordset[i].tasks,
                });
            }
            const totalProjects = result.output.TotalProjects;
            res.status(200).json({ projects, totalProjects });
        }
    }).catch(err => {
        res.status(500).send('Internal server error.');
    });
};

//get all projects in the database
exports.getAllProjects = (req, res) => {
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .execute('getAllProjects');
    }).then((result, err) => {
        if (err) {
            res.status(500).send('Internal server error.');
        } else {
            //send the projects as json
            let projects = [];
            for (let i = 0; i < result.recordset.length; i++) {
                projects.push({
                    id: result.recordset[i].id,
                    name: result.recordset[i].name,
                    description: result.recordset[i].description,
                    assigned: result.recordset[i].assigned,
                    user_id: result.recordset[i].user_id,
                    tasks: result.recordset[i].tasks,
                });
            }
            res.status(200).json({ projects });
        }
    }).catch(err => {
        res.status(500).send('Internal server error.');
    });
};


exports.assignUserTask = (req, res) => {
    const { task, user } = req.body;
    if (task && user) {
        sql.connect(dbConfig).then(pool => {
            return pool.request()
                .input('taskId', sql.Int, parseInt(task))
                .input('userId', sql.Int, parseInt(user))
                .output('updated', sql.Bit)
                .execute('assignTaskUser');
        }).then((result, err) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                let updated = result.output.updated;
                if (updated) {
                    res.send('User assigned task successfully.');
                } else {
                    res.status(500).send('Something went wrong. Please try again later.');
                }
            }
        })
    } else {
        res.status(400).send('Both task and user are required.');
    }
}

exports.assignUserProject = (req, res) => {
    const { project, user } = req.body;
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .input('projectId', sql.Int, parseInt(project))
            .input('userId', sql.Int, parseInt(user))
            .output('updated', sql.Int)
            .execute('assignProjectUser');
    }).then((result, err) => {
        if (err) {
            res.status(500).send('Hmm. That was not supposed to happen.');
        } else {
            let updated = result.output.updated;
            // console.log(`Updated: ${updated}`);
            if (updated === 1) {
                res.send('User assigned project successfully.');
            } else {
                res.status(500).send('Oops. This is embarassing. Something is not right.');
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send('Error while assigning user project');
    })
}

//get all tasks for a project
exports.getProjectTasks = (req, res) => {
    const project_id = req.params.project_id;
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .input('projectId', sql.Int, parseInt(project_id))
            .execute('getProjectTasks');
    }).then((result, err) => {
        if (err) {
            res.status(500).send('We cannot service your request right now.');
        } else {
            let tasks = []
            for (let i = 0; i < result.recordset.length; i++) {
                let task = result.recordset[i];
                tasks.push({
                    id: task.id,
                    name: task.name,
                    description: task.description,
                    completed: task.completed === 1,
                    user_id: task.user_id,
                    user_name: task.assigned,
                });
            }
            res.json(tasks);
        }
    }).catch(err => {
        res.status(500).send('An error occurred while getting the tasks for the project.');
    })
};

//get the tasks of a project in a paginated manner
exports.getProjectTasksPaginated = (req, res) =>{
    let {page, limit} = req.query;
    const project_id = req.params.project_id;
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .input('projectId', sql.Int, parseInt(project_id))
            .input('PageNumber', sql.Int, parseInt(page))
            .input('RowCount', sql.Int, parseInt(limit))
            .output('TotalTasks', sql.Int)
            .execute('getProjectTasksPaginated');
    }).then((result, err) => {
        if (err) {
            res.status(500).send('We cannot service your request right now.');
        } else {
            let tasks = []
            for (let i = 0; i < result.recordset.length; i++) {
                let task = result.recordset[i];
                tasks.push({
                    id: task.id,
                    name: task.name,
                    description: task.description,
                    completed: task.completed === 1,
                    user_id: task.user_id,
                    user_name: task.assigned,
                });
            }
            res.json({tasks: tasks, totalTasks: result.output.TotalTasks});
        }
    }).catch(err => {
        res.status(500).send('An error occurred while getting the tasks for the project.');
    })
};

//save a project
exports.saveProject = (req, res) => {
    if (req.user.group !== 'admin') { //use better conditions!!
        res.status(401).send('Only admins can view this page.');
    } else if (req.user.group === 'admin') {
        //name and description required
        const { name, description } = req.body;
        if (name && description) {
            //save the project
            sql.connect(dbConfig).then(pool => {
                return pool.request()
                    .input('projectName', sql.VarChar(50), name)
                    .input('description', sql.VarChar(255), description)
                    .output('inserted', sql.Bit)
                    .execute('insertProject');
            }).then((result, err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occurred. We are working to fix that.');
                } else {
                    let inserted = result.output.inserted;
                    if (inserted == 1) {
                        res.status(201).send('Project saved successfully.');
                    } else {
                        res.status(500).send('An error occurred. We\'re working to fix that.');
                    }
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send('An error occurred. We are working to fix that.');
            });
        } else {
            res.status(400).send('Both project name and description are required.');
        }
    }
};

//adds a task to the project
exports.addTaskToProject = (req, res) => {
    const { name, description, project } = req.body;
    if (name && description && project) {
        sql.connect(dbConfig).then(pool => {
            return pool.request()
                .input('taskName', sql.VarChar(50), name)
                .input('description', sql.VarChar(225), description)
                .input('projectId', sql.Int, parseInt(project))
                .output('inserted', sql.Bit)
                .execute('insertTask');
        }).then((result, err) => {
            if (err) {
                res.status(500).send('An error occurred while saving the task.');
            } else {
                if (result.output.inserted) {
                    res.send('Task added successfully');
                } else {
                    console.log(`Inserted: ${result.output.inserted}`);
                    res.status(500).send('Somethings not right. Please check again later.');
                }
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send('Oops. That was not supposed to happen.');
        })
    } else {
        res.status(400).send('Project id, task name and task description are required.');
    }
}

//get the tasks of a user in a paginated manner
exports.getUserTasksPaginated = (req, res) =>{
    let {page, limit, orderBy} = req.query;
    const userId = parseInt(req.user.id);
    let orderById = 0;
    let orderByName = 0;
    let orderByDescription = 0;
    if (orderBy === 'id') orderById = 1;
    else if (orderBy === 'name') orderByName = 1;
    else if (orderBy === 'description') orderByDescription = 1;
    else orderById = 1;
    sql.connect(dbConfig).then(pool =>{
        return pool.request()
        .input('UserId', sql.Int, userId)
        .input('PageNumber', sql.Int, parseInt(page))
        .input('RowCount', sql.Int, parseInt(limit))
        .input('OrderById', sql.Bit, orderById)
        .input('OrderByName', sql.Bit, orderByName)
        .input('OrderByDescription', sql.Bit, orderByDescription)
        .output('TotalTasks', sql.Int)
        .execute('getUserTasksPaginated');
    }).then((result, err)=>{
        if (err){
            res.status(500).send('We could not complete the request at the moment. Please try again later.');
        }
        else{
            let tasks = [];
            for (let i = 0; i < result.recordset.length; i++) {

                const { id, name, description, completed, project_id } = result.recordset[i]
                tasks.push({
                    id,
                    name,
                    description,
                    completed,
                    project_id
                });
            }
            res.json({
                tasks,
                totalTasks: result.output.TotalTasks});
        }
    }).catch(err=>{
        res.status(500).send('An error occurred while fetching user tasks.');
    })
};

exports.getUserTasks = (req, res) => {
    sql.connect(dbConfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, parseInt(req.user.id))
            .execute('getUserTasks');
    }).then((result, err) => {
        if (err) {
            // console.log(err);
            res.status(500).send('Internal server error.');
        } else {
            let tasks = [];
            for (let i = 0; i < result.recordset.length; i++) {

                const { id, name, description, completed, project_id } = result.recordset[i]
                tasks.push({
                    id,
                    name,
                    description,
                    completed,
                    project_id
                });
            }
            res.json(tasks);
        }
    }).catch(err => {
        // console.log(err);
        res.status(500).send('Internal server error.');
    })
}