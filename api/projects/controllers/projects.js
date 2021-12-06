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

exports.getProjectTasks = (req, res) =>{

};