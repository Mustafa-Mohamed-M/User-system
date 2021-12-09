require('dotenv').config();
const dbConfig = require("../database/config"); //database configuration
const sql = require("mssql"); //SQL Server

//get the projects of a particular user
exports.getUserProject = (req, res)=>{
    sql.connect(dbConfig).then(pool =>{
      return pool.request()
      .input('userId', sql.Int, parseInt(req.user.id))
      .execute('getUserProject');
    }).then((result, err)=>{
        if (err){
            // console.log(err);
            res.status(500).send('Internal server error.');
        }
        else{
            let project = {};
            if (result.recordset.length === 1){
                const {id, name, description} = result.recordset[0];
                project['id'] = id;
                project['name'] = name;
                project['description'] = description;
            }
            res.json(project);
        }
    }).catch(err=>{
        // console.log(err);
        res.status(500).send('Internal server error.');
    })
};

//get all projects in the database
exports.getAllProjects = (req, res)=>{
    sql.connect(dbConfig).then(pool=>{
        return pool.request()
        .execute('getAllProjects');
    }).then((result, err)=>{
        if (err){
            res.status(500).send('Internal server error.');    
        }
        else{
            //send the projects as json
            let projects = [];
            for (let i = 0; i < result.recordset.length; i++){
                projects.push({
                    id: result.recordset[i].id,
                    name: result.recordset[i].name,
                    description: result.recordset[i].description,
                    assigned: result.recordset[i].assigned,
                });
            }
            res.status(200).json({projects});
        }
    }).catch(err=>{
        res.status(500).send('Internal server error.');
    });
};

//get all tasks for a project
exports.getProjectTasks = (req, res) =>{

};