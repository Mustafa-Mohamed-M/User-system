import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function UserHome(){

    const [message, setMessage] = useState();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    const columns = [
        {dataField: 'number', text: '#'},
        {dataField: 'name', text: 'Task name'},
        {dataField: 'description', text: 'Description'},
        {dataField: 'completed', text: 'Completed'}
    ];


    const navigate = useNavigate();

    function logOut(event){
        event.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }

    async function getUserTasks(){
        try{
            let result = await axios.get(`http://localhost:5001/projects/get_user_tasks`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTasks(result.data.map((item, index)=>{
                return {
                    number: index + 1,
                    name: item.name,
                    description: item.description,
                    completed: item.completed ? "Yes" : "No",
                }
                
            }));
        } catch (err){
            setMessage(`Something's not right. Please try again later.`);
        }
    }

    async function getProject(){
        try{
            let result = await axios.post(`http://localhost:5001/projects/get_user_project`, 
            {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(result);
            let theProject = result.data;
            if (theProject['id']){
                setProject(theProject);
            }
            else{
                setProject(null);
            }
            return true;
        } catch (err){
            console.log('An error occurred.');
            setMessage(err.response ? err.response.data : "An error occurred.");
            return false;
        }
    }

    useEffect( ()=>{

        if (!localStorage.getItem('token')){
            navigate('/login');
        }
        else{
            async function getStuff(){
                let success = await getProject();
                if (success){
                    getUserTasks();
                }
                else{
                    navigate('/login');
                }    
            };
            getStuff();
            
        }
    }, []);


    return <React.Fragment>
        <nav id="navbar-0" className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
            <a className="navbar-brand" href="#">User system</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-0" aria-controls="navbar-0" aria-expanded="false" aria-label="Toggle Navigation">
                <span className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbar-0">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="#" >
                        Logged in as {}
                    </a>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="navbar-0">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="#" onClick={(evt)=>logOut(evt)}>
                        Logout
                    </a>
                </div>
            </div>
        </nav>
        <div className="container" >
            <div className="row" >
                <div className="col" >
                    {
                        project === null ? 
                        <div>You have not been assigned a project yet</div> 
                        : 
                        <div className="alert alert-info alert-sm show" >
                            You have been assigned 1 project.
                            <p>{project.name}</p>
                            <p>{project.description}</p>
                        </div>
                    }
                    {
                        project && 
                        <div>
                            {tasks.length === 0 ? "You have not been assigned any tasks yet." : 
                                "You have been assigned the following " + tasks.length + " task(s)."}
                            <br/>
                            <BootstrapTable className="table" keyField="id" data={tasks} columns={columns} 
                            pagination={paginationFactory()} />
                            
                        </div>
                    }
                </div>
            </div>
        </div>
        
    </React.Fragment>;
}